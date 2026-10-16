async function executeImageOCR(dataUrl) {
  if (window.showStatus) {
    window.showStatus('Analyzing image text…');
  }

  // Load settings from extension storage
  const settings = await new Promise((resolve) => {
    chrome.storage.local.get(['textora_google_api_key', 'textora_use_google_ocr'], resolve);
  });

  const userApiKey = (settings.textora_google_api_key || '').trim();
  // Default to Google Gemini API if not explicitly toggled off
  const useGoogle = settings.textora_use_google_ocr !== false;

  try {
    if (useGoogle) {
      // Run Gemini OCR by routing request through background service worker
      // Background worker prioritizes userApiKey > default env API key
      const base64Content = dataUrl.split(',')[1];
      
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          { action: 'GEMINI_OCR', apiKey: userApiKey, base64Content },
          resolve
        );
      });

      if (response && response.success) {
        const data = response.data;
        const extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (extractedText && extractedText.trim()) {
          if (window.copyToClipboard) {
            window.copyToClipboard(extractedText.trim(), 'Image OCR');
          } else {
            navigator.clipboard.writeText(extractedText.trim());
            alert('Copied to clipboard');
          }
          return;
        } else {
          if (window.showStatus) {
            window.showStatus('No text detected in selected area', true);
          } else {
            alert('No text detected in selected area');
          }
          return;
        }
      }

      // If Gemini fails because no key is configured anywhere, fallback to local Tesseract
      console.warn('Gemini OCR unavailable, attempting local Tesseract fallback:', response?.error);
      if (response?.error && response.error.includes('No Gemini API Key')) {
        await runLocalTesseract(dataUrl);
        return;
      }

      throw new Error(response?.error || 'Gemini API request failed');
    } else {
      await runLocalTesseract(dataUrl);
    }
  } catch (e) {
    console.error("OCR Error:", e);
    // If Gemini API throws an error (e.g. quota limit), attempt local Tesseract fallback
    try {
      if (window.showStatus) {
        window.showStatus('Gemini unavailable, switching to local OCR…');
      }
      await runLocalTesseract(dataUrl);
    } catch (fallbackErr) {
      if (window.showStatus) {
        window.showStatus(e.message || 'OCR extraction failed', true);
      } else {
        alert('OCR extraction failed: ' + e.message);
      }
    }
  }
}

async function runLocalTesseract(dataUrl) {
  if (window.showStatus) {
    window.showStatus('Analyzing text locally (Tesseract)…');
  }
  const res = await Tesseract.recognize(dataUrl, "eng");
  if (res.data.text.trim()) {
    if (window.copyToClipboard) {
      window.copyToClipboard(res.data.text.trim(), 'Image OCR');
    } else {
      navigator.clipboard.writeText(res.data.text.trim());
      alert('Copied to clipboard');
    }
  } else {
    if (window.showStatus) {
      window.showStatus('No text detected in selected area', true);
    } else {
      alert('No text detected in selected area');
    }
  }
}

window.executeImageOCR = executeImageOCR;
