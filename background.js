// ─── Environment & Default API Key ─────────────────────────────────────────
// Loads local git-ignored default key if present (never tracked in public repo)
let DEFAULT_ENV_API_KEY = '';

try {
  importScripts('env.js');
  if (typeof ENV_DEFAULT_GEMINI_API_KEY !== 'undefined' && ENV_DEFAULT_GEMINI_API_KEY) {
    DEFAULT_ENV_API_KEY = ENV_DEFAULT_GEMINI_API_KEY.trim();
  }
} catch (e) {
  // env.js is optional; safe for clean public clones
}

// Candidate models for Gemini API (uses Gemini 2.5 Flash as primary, with automatic fallbacks)
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

/**
 * Resolves the effective API key:
 * 1. Explicitly passed custom key (e.g. testing manual input)
 * 2. Stored user manual key from chrome.storage.local
 * 3. Default fallback key from env.js or .env
 */
async function getEffectiveApiKey(candidateKey) {
  if (candidateKey && typeof candidateKey === 'string' && candidateKey.trim()) {
    return { apiKey: candidateKey.trim(), isCustom: true };
  }

  const storage = await new Promise(resolve => {
    chrome.storage.local.get(['textora_google_api_key'], resolve);
  });
  if (storage && storage.textora_google_api_key && storage.textora_google_api_key.trim()) {
    return { apiKey: storage.textora_google_api_key.trim(), isCustom: true };
  }

  if (DEFAULT_ENV_API_KEY && DEFAULT_ENV_API_KEY.trim()) {
    return { apiKey: DEFAULT_ENV_API_KEY.trim(), isCustom: false };
  }

  // Fallback: try reading .env file if present
  try {
    const res = await fetch(chrome.runtime.getURL('.env'));
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/^\s*GEMINI_API_KEY\s*=\s*["']?([^"'\r\n]+)["']?/m);
      if (match && match[1]) {
        DEFAULT_ENV_API_KEY = match[1].trim();
        return { apiKey: DEFAULT_ENV_API_KEY, isCustom: false };
      }
    }
  } catch (e) {}

  return { apiKey: '', isCustom: false };
}

/**
 * Executes a Gemini generateContent request with automatic model fallback
 */
async function callGeminiApiWithFallback(apiKey, requestBody) {
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, data, model };
      }

      const text = await res.text();
      const parsedMsg = parseErrorResponse(res.status, text);

      // If model is not found (404), try next model in candidate list
      if (res.status === 404) {
        lastError = new Error(parsedMsg);
        continue;
      }

      // For auth errors or rate limits, fail immediately with clear reason
      throw new Error(parsedMsg);
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('not found')) {
        lastError = err;
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('Failed to reach Gemini API. Please check your network and API key.');
}

function parseErrorResponse(status, text) {
  let errMsg = `Gemini API error (Status ${status})`;
  if (status === 429) {
    return 'Gemini API limit reached. Please wait or try again later.';
  }
  if (status === 400 || status === 403) {
    errMsg = 'Invalid or unauthorized API Key. Please verify your Google AI Studio API Key.';
  }
  try {
    const parsed = JSON.parse(text);
    if (parsed.error) {
      const statusText = parsed.error.status || '';
      const msgText = parsed.error.message || '';
      if (statusText === 'RESOURCE_EXHAUSTED' || msgText.toLowerCase().includes('limit') || msgText.toLowerCase().includes('quota')) {
        return 'Gemini API limit reached. Please wait or try again later.';
      }
      if (statusText === 'API_KEY_INVALID' || msgText.toLowerCase().includes('api key')) {
        return msgText || 'API Key is invalid or expired. Check Google AI Studio.';
      }
      return msgText || errMsg;
    }
  } catch (e) {}
  return errMsg;
}


// ─── Runtime Messages Listener ─────────────────────────────────────────────
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'CAPTURE_TAB') {
    const windowId = sender.tab ? sender.tab.windowId : null;
    chrome.tabs.captureVisibleTab(windowId, { format: 'png' })
      .then(dataUrl => {
        sendResponse({ success: true, dataUrl });
      })
      .catch(err => {
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep channel open
  }
  
  else if (request.action === 'GEMINI_OCR') {
    const { apiKey: clientApiKey, base64Content } = request;

    getEffectiveApiKey(clientApiKey)
      .then(({ apiKey }) => {
        if (!apiKey) {
          sendResponse({
            success: false,
            error: 'No Gemini API Key available. Please configure an API Key in settings.'
          });
          return;
        }

        callGeminiApiWithFallback(apiKey, {
          contents: [{
            parts: [
              { text: "Extract all text from this image. Output only the extracted text. Do not add any introduction, explanation, or commentary." },
              { inlineData: { mimeType: "image/png", data: base64Content } }
            ]
          }]
        })
        .then(result => {
          sendResponse({ success: true, data: result.data, model: result.model });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });

    return true; // Keep message channel open for async response
  }
  
  else if (request.action === 'TEST_GEMINI_API') {
    (async () => {
      try {
        const { apiKey, isCustom } = await getEffectiveApiKey(request.apiKey);
        if (!apiKey) {
          sendResponse({
            success: false,
            error: 'No API Key found. Please enter a Gemini API Key in settings.'
          });
          return;
        }

        const result = await callGeminiApiWithFallback(apiKey, {
          contents: [{
            parts: [{ text: "Hello" }]
          }]
        });

        sendResponse({ success: true, model: result.model, isCustom });
      } catch (error) {
        sendResponse({
          success: false,
          error: error?.message || String(error) || 'Failed to connect to Gemini API'
        });
      }
    })();

    return true; // Keep message channel open for async response!
  }

  else if (request.action === 'GET_API_KEY_STATUS') {
    getEffectiveApiKey()
      .then(({ apiKey, isCustom }) => {
        sendResponse({
          hasCustomKey: isCustom && !!apiKey,
          hasDefaultKey: !isCustom && !!apiKey,
          hasAnyKey: !!apiKey
        });
      })
      .catch(() => {
        sendResponse({ hasCustomKey: false, hasDefaultKey: false, hasAnyKey: false });
      });

    return true;
  }
});


// ─── Keyboard Commands ─────────────────────────────────────────────────────
chrome.commands.onCommand.addListener((command) => {
  console.log('Witcopy command received:', command);
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab || !activeTab.id) {
      console.warn('Witcopy: No active tab found in last focused window.');
      return;
    }
    console.log('Witcopy targeting tab:', activeTab.id, activeTab.url);
    
    let action = '';
    if (command === 'run_select_area') {
      action = 'SELECT_AREA';
    } else if (command === 'run_copy_image') {
      action = 'BULK_OCR';
    } else if (command === 'run_copy_link') {
      action = 'COPY_LINK';
    }
    
    if (action) {
      const sendMsg = () => {
        chrome.tabs.sendMessage(activeTab.id, { action }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn('Witcopy: Error sending message to content script:', chrome.runtime.lastError.message);
          } else {
            console.log('Witcopy: Command sent successfully:', action);
          }
        });
      };

      // Ping tab to check if content script is loaded
      chrome.tabs.sendMessage(activeTab.id, { action: 'PING' }, (resp) => {
        if (chrome.runtime.lastError) {
          console.log('Witcopy: Content script not loaded. Injecting scripts...', chrome.runtime.lastError.message);
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ['lib/tesseract.min.js', 'ocr.js', 'content.js']
          }).then(() => {
            console.log('Witcopy: Scripts injected successfully.');
            setTimeout(sendMsg, 120);
          }).catch((err) => {
            console.error('Witcopy: Script injection failed:', err);
          });
        } else {
          console.log('Witcopy: Content script is responsive (PING received PONG).');
          sendMsg();
        }
      });
    }
  });
});
