import { useState, type FormEvent } from "react";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { 
  Star, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Medal, 
  Check, 
  Bolt, 
  Target, 
  Lock, 
  MousePointer, 
  Palette, 
  Brain 
} from "lucide-react";

export function FeedbackPage() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [mostUsedFeature, setMostUsedFeature] = useState("Selected Area");
  const [selectedPros, setSelectedPros] = useState<string[]>(["Speed", "Accuracy", "Privacy"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const ratingLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Great",
    5: "Excellent!",
  };

  const proOptions = [
    { label: "Speed", icon: Bolt },
    { label: "Accuracy", icon: Target },
    { label: "Privacy", icon: Lock },
    { label: "Easy to use", icon: MousePointer },
    { label: "Design", icon: Palette },
    { label: "OCR Quality", icon: Brain },
  ];

  const togglePro = (label: string) => {
    setSelectedPros((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("access_key", "0a33001d-99d2-4221-a5b9-721ae3e376df");
    formData.append("subject", `New Feedback - ${rating}/5 Rating`);
    formData.append("rating", `${rating}/5 - ${ratingLabels[rating] || ""}`);
    formData.append("name", name || "Anonymous");
    formData.append("email", email || "Not provided");
    formData.append("most_used_feature", mostUsedFeature);
    formData.append("pros", selectedPros.join(", "));
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const json = await response.json();
      if (json.success) {
        setStatus("success");
      } else {
        throw new Error(json.message || "Failed to submit feedback");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-foreground">
      <Header />

      <main className="flex-1 py-16 md:py-24 bg-surface">
        <Container>
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-14">
            <Badge variant="primary" className="py-1 px-3">
              <Star className="h-3.5 w-3.5 mr-1.5 fill-primary" />
              Share Your Experience
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Your Feedback <span className="text-primary">Matters.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Tell us what you love, what is broken, and what feature you would like to see next. Every response shapes what we build.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
            {/* Left Column: Interactive Rating & Side Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Star Rating Selection Card */}
              <div className="bg-white border border-border p-6 rounded-xl flex flex-col items-center text-center gap-5">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Medal className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">Rate WitCopy</h3>
                  <p className="text-xs text-muted">Click stars to select your rating</p>
                </div>

                {/* Stars Row */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = starVal <= currentDisplayRating;
                    return (
                      <button
                        type="button"
                        key={starVal}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starVal)}
                        className="p-1 transition-transform hover:scale-110 focus-visible:outline-none"
                        aria-label={`Rate ${starVal} star${starVal > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`h-7 w-7 transition-colors ${
                            isFilled
                              ? "text-primary fill-primary"
                              : "text-border fill-transparent"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Rating Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  <Star className="h-3.5 w-3.5 fill-primary" />
                  <span>{ratingLabels[currentDisplayRating]} ({currentDisplayRating}/5)</span>
                </div>
              </div>

              {/* Side Stats Focus Card */}
              <div className="bg-white border border-border p-6 rounded-xl flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
                  What We Focus On
                </h4>

                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted">Privacy & Security</span>
                    <span className="font-bold text-foreground bg-surface border border-border px-2 py-0.5 rounded">100% Local</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted">Processing Speed</span>
                    <span className="font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">&lt; 50ms</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted">OCR Accuracy</span>
                    <span className="font-bold text-foreground bg-surface border border-border px-2 py-0.5 rounded">99.8%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted">Code Syntax Support</span>
                    <span className="font-bold text-foreground bg-surface border border-border px-2 py-0.5 rounded">Developer Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Feedback Form */}
            <div className="lg:col-span-8 bg-white border border-border p-6 sm:p-10 rounded-xl">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Share Your <span className="text-primary">Thoughts.</span>
              </h2>
              <p className="text-sm text-muted mb-8">
                Help us build a better experience for everyone — no account required.
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col items-center text-center gap-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  <h3 className="text-lg font-bold">Feedback Submitted!</h3>
                  <p className="text-sm text-emerald-700 max-w-md">
                    Thank you so much for taking the time to share your feedback. Your input directly helps improve WitCopy.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-emerald-600 text-emerald-700 hover:bg-emerald-100"
                    onClick={() => {
                      setStatus("idle");
                      setMessage("");
                    }}
                  >
                    Submit Another Feedback
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name & Email (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fb-name" className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Your Name <span className="text-muted font-normal text-[10px]">(optional)</span>
                      </label>
                      <input
                        id="fb-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="h-11 px-3.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fb-email" className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Email Address <span className="text-muted font-normal text-[10px]">(optional)</span>
                      </label>
                      <input
                        id="fb-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 px-3.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Feature Select */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fb-feature" className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Which feature do you use most?
                    </label>
                    <select
                      id="fb-feature"
                      value={mostUsedFeature}
                      onChange={(e) => setMostUsedFeature(e.target.value)}
                      className="h-11 px-3.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Selected Area">Selected Area (Screen Snip)</option>
                      <option value="Image OCR">Image & Screen OCR</option>

                      <option value="Copy from Link">Copy Link Text</option>
                      <option value="Code Syntax Parsing">Code Syntax Parsing</option>
                      <option value="Clipboard History">Clipboard Log Drawer</option>
                    </select>
                  </div>

                  {/* Highlights / Pros Checklist */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                      What is working well?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {proOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isChecked = selectedPros.includes(opt.label);
                        return (
                          <button
                            type="button"
                            key={opt.label}
                            onClick={() => togglePro(opt.label)}
                            className={`flex items-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all text-left ${
                              isChecked
                                ? "bg-primary/10 border-primary text-foreground"
                                : "bg-surface border-border text-muted hover:border-muted/40"
                            }`}
                          >
                            <div className={`p-1 rounded ${isChecked ? "bg-primary text-primary-foreground" : "bg-border text-muted"}`}>
                              <Check className="h-3 w-3" />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Icon className="h-3.5 w-3.5 text-primary" />
                              <span>{opt.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detailed Feedback Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fb-message" className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Tell us more <span className="text-muted font-normal text-[10px]">(optional)</span>
                    </label>
                    <textarea
                      id="fb-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What should we improve? Any bugs found or features you would love to see?"
                      className="p-3.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"

                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Submitting Feedback...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Submit Feedback</span>
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted">
                      Thank you for helping us improve WitCopy!
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
