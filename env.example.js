// env.example.js - Template for local environment configuration
// Copy this file to env.js and insert your Gemini API Key.
// env.js is git-ignored and will not be exposed in public repositories.
var ENV_DEFAULT_GEMINI_API_KEY = "";
if (typeof self !== 'undefined') {
  self.ENV_DEFAULT_GEMINI_API_KEY = ENV_DEFAULT_GEMINI_API_KEY;
}
