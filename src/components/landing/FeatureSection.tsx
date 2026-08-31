import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { FEATURE_SHOWCASES } from "../../data/landing";
import { 
  CheckCircle2, 
  Settings, 
  Eye, 
  EyeOff, 
  Check, 
  Key,
  Link as LinkIcon,
  History,
  Search,
  Copy,
  Trash2,
  ExternalLink,
  MousePointerClick
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { APP_CONFIG } from "../../lib/constants";

export function FeatureSection() {
  // Settings mock state (Showcase 2)
  const [isGeminiEnabled, setIsGeminiEnabled] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("AIzaSyB9X_kQ2mR8vP4N7wL1zY3tU5sO");
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Copy from Link & History mock state (Showcase 3)
  const [copiedLinkNotice, setCopiedLinkNotice] = useState<string | null>(null);
  const [historySearch, setHistorySearch] = useState("");
  const [historyItems, setHistoryItems] = useState([
    {
      id: "h1",
      badge: "Copy from Link",
      title: "WitCopy GitHub Repository",
      text: APP_CONFIG.githubUrl,
      timestamp: "2 mins ago",
    },
    {
      id: "h2",
      badge: "Selected Area",
      title: "Documentation Snip",
      text: "TreesWalker spatial analysis text node parser.",
      timestamp: "12 mins ago",
    },
    {
      id: "h3",
      badge: "Copy from Image",
      title: "Gemini 2.5 Flash OCR",
      text: "Dual engine OCR processing completed in 38ms.",
      timestamp: "1 hour ago",
    },
  ]);
  const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);

  const handleTestApiKey = () => {
    setTestStatus("Testing...");
    setTimeout(() => {
      setTestStatus("✅ Gemini 2.5 Flash API Connected!");
      setTimeout(() => setTestStatus(null), 3000);
    }, 800);
  };

  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLinkClick = (e: React.MouseEvent, _label: string, url: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setCopiedLinkNotice(`Copied link: "${url}" (0 navigation triggered)`);
    setTimeout(() => setCopiedLinkNotice(null), 3000);
  };

  const handleCopyHistory = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHistoryId(id);
    setTimeout(() => setCopiedHistoryId(null), 2000);
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredHistory = historyItems.filter(
    (item) =>
      item.title.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.text.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.badge.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <section id="showcase" className="w-full py-20 md:py-28 bg-white border-b border-border">
      <Container className="flex flex-col gap-24 md:gap-32">
        {FEATURE_SHOWCASES.map((showcase, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={showcase.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            >
              {/* Text Side */}
              <div
                className={`lg:col-span-6 flex flex-col items-start gap-5 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Badge variant="primary">{showcase.badgeText}</Badge>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  {showcase.title}
                </h2>

                <p className="text-base sm:text-lg text-muted leading-relaxed">
                  {showcase.description}
                </p>

                <ul className="flex flex-col gap-3 pt-2">
                  {showcase.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm sm:text-base text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Preview Side */}
              <div
                className={`lg:col-span-6 flex justify-center ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="w-full max-w-md">

                  {/* Showcase 1: Extension Popup Graphic */}
                  {showcase.interactiveType === "snippet-ocr" && (
                    <div className="flex flex-col items-center justify-center p-0">
                      <img
                        src="/witcopy.svg"
                        alt="WitCopy Chrome Extension Popup Interface"
                        className="w-full h-auto max-h-[420px] object-contain"
                      />
                    </div>
                  )}

                  {/* Showcase 2: OCR Settings (Gemini 2.5 API Key Input Mockup) */}
                  {showcase.interactiveType === "multi-lang" && (
                    <div className="bg-white border border-border rounded-xl p-5 sm:p-6 max-w-md mx-auto">
                      <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <Settings className="h-5 w-5 text-primary" />
                          OCR Settings
                        </h3>
                        <span className="text-xs font-mono text-muted bg-surface border border-border px-2 py-0.5 rounded">
                          Extension Popup
                        </span>
                      </div>

                      {/* Engine Toggle */}
                      <div className="flex flex-col gap-1.5 mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
                          OCR ENGINE
                        </span>
                        <div className="flex items-center justify-between bg-surface border border-border p-3 rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">
                              Gemini 2.5 Flash API
                            </span>
                            <span className="text-[11px] text-muted leading-tight max-w-[240px]">
                              High-speed multimodal AI engine for non-English & complex text.
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setIsGeminiEnabled(!isGeminiEnabled)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isGeminiEnabled ? "bg-primary" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                isGeminiEnabled ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-[11px] text-muted italic">
                          Otherwise, falls back to offline Tesseract.js.
                        </p>
                      </div>

                      {/* API Key Input */}
                      <div className="flex flex-col gap-1.5 mb-5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono flex items-center gap-1">
                          <Key className="h-3 w-3 text-primary" />
                          GEMINI API KEY
                        </label>

                        <div className="relative flex items-center">
                          <input
                            type={showApiKey ? "text" : "password"}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="w-full h-10 pl-3 pr-10 rounded-lg border border-border bg-surface text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 text-muted hover:text-foreground"
                          >
                            {showApiKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>

                        <span className="text-[11px] text-muted">
                          Stored securely in your local extension storage.
                        </span>
                      </div>

                      {/* Test Result Message */}
                      {testStatus && (
                        <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 text-center animate-fadeIn">
                          {testStatus}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleTestApiKey}
                          className="w-full text-xs font-semibold border-border hover:bg-surface"
                        >
                          Test API Key
                        </Button>

                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={handleSaveSettings}
                          className="w-full text-xs font-semibold bg-primary"
                        >
                          {isSaved ? (
                            <span className="flex items-center gap-1.5">
                              <Check className="h-4 w-4 text-white" />
                              Settings Saved!
                            </span>
                          ) : (
                            "Save Settings"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Showcase 3: Copy from Link & Searchable History Drawer Interactive UI */}
                  {showcase.interactiveType === "format-export" && (
                    <div className="bg-white border border-border rounded-xl p-5 sm:p-6 flex flex-col gap-5 max-w-md mx-auto">
                      {/* Top Header */}
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-bold text-foreground">
                            Copy from Link (ALT + L)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded font-semibold">
                          Zero Navigation Mode
                        </span>
                      </div>

                      {/* Live Link Hover Playground */}
                      <div className="bg-surface border border-border p-3.5 rounded-lg flex flex-col gap-2.5">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-semibold flex items-center gap-1">
                          <MousePointerClick className="h-3 w-3 text-primary" />
                          Click any link below to test copy without navigating
                        </span>

                        <div className="flex flex-col gap-2 text-xs">
                          <button
                            type="button"
                            onClick={(e) =>
                              handleLinkClick(
                                e,
                                "WitCopy GitHub Repo",
                                APP_CONFIG.githubUrl
                              )
                            }
                            className="flex items-center justify-between p-2 rounded bg-white border border-border hover:border-primary text-primary font-semibold text-left transition-colors"
                          >
                            <span className="truncate max-w-[260px] underline">
                              {APP_CONFIG.githubUrl}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) =>
                              handleLinkClick(
                                e,
                                "Chrome Store Extension Link",
                                APP_CONFIG.chromeStoreUrl
                              )
                            }
                            className="flex items-center justify-between p-2 rounded bg-white border border-border hover:border-primary text-foreground font-medium text-left transition-colors"
                          >
                            <span className="truncate max-w-[260px] underline">
                              Install WitCopy on Chrome Store
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted" />
                          </button>
                        </div>

                        {copiedLinkNotice && (
                          <div className="p-2 rounded bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary text-center animate-fadeIn">
                            {copiedLinkNotice}
                          </div>
                        )}
                      </div>

                      {/* History Panel Divider */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <History className="h-4 w-4 text-primary" />
                          Popup Copy History Panel
                        </span>
                        <span className="text-[10px] text-muted font-mono">
                          chrome.storage.local
                        </span>
                      </div>

                      {/* History Search Input */}
                      <div className="relative flex items-center">
                        <Search className="absolute left-3 h-3.5 w-3.5 text-muted" />
                        <input
                          type="text"
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          placeholder="Search history by keyword or label..."
                          className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-surface text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      {/* History Item Cards */}
                      <div className="flex flex-col gap-2 max-h-[190px] overflow-y-auto pr-1">
                        {filteredHistory.length > 0 ? (
                          filteredHistory.map((item) => (
                            <div
                              key={item.id}
                              className="p-2.5 rounded-lg border border-border bg-surface flex items-center justify-between gap-2"
                            >
                              <div className="flex flex-col gap-0.5 truncate">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] font-mono uppercase bg-white border border-border px-1.5 py-0.2 rounded font-semibold text-primary">
                                    {item.badge}
                                  </span>
                                  <span className="text-xs font-bold text-foreground truncate">
                                    {item.title}
                                  </span>
                                </div>
                                <span className="text-[11px] font-mono text-muted truncate">
                                  {item.text}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopyHistory(item.id, item.text)
                                  }
                                  className="p-1 rounded text-muted hover:text-primary hover:bg-white transition-colors"
                                  title="Copy text"
                                >
                                  {copiedHistoryId === item.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteHistory(item.id)}
                                  className="p-1 rounded text-muted hover:text-red-500 hover:bg-white transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-xs text-muted">
                            No history items match "{historySearch}"
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
