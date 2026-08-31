import { useState, type FormEvent } from "react";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { GithubIcon, InstagramIcon } from "../components/ui/BrandIcons";

import { APP_CONFIG } from "../lib/constants";


import { 
  Mail, 
  Globe, 
  Clock, 
  Star, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Headset, 
  Bug, 
  Lightbulb, 
  HelpCircle, 
  Handshake, 
  Paperclip 
} from "lucide-react";

export function ContactPage() {
  const [topic, setTopic] = useState("Bug Report");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("access_key", "0a33001d-99d2-4221-a5b9-721ae3e376df");
    formData.append("subject", `New Contact Message - ${topic}`);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("topic", topic);
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
        throw new Error(json.message || "Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const topics = [
    { label: "Bug Report", value: "Bug Report", icon: Bug },
    { label: "Feature Request", value: "Feature Request", icon: Lightbulb },
    { label: "General Question", value: "General Question", icon: HelpCircle },
    { label: "Partnership", value: "Partnership", icon: Handshake },
    { label: "Other", value: "Other", icon: Paperclip },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-foreground">
      <Header />
      
      <main className="flex-1 py-16 md:py-24 bg-surface">
        <Container>
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-14">
            <Badge variant="primary" className="py-1 px-3">
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              Reach Out
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Get in <span className="text-primary">Touch.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Have a question, found a bug, or want to collaborate? We read and reply to every message personally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
            {/* Left Column: Info & Socials */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Contact Details Card */}
              <div className="bg-white border border-border p-6 rounded-xl flex flex-col gap-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Headset className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">Contact Info</h3>
                    <p className="text-xs text-muted">Multiple ways to reach us</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-xs">


                  <div className="flex items-start gap-3">
                    <GithubIcon className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-muted block text-[10px]">GitHub Issues</span>
                      <a href={APP_CONFIG.githubUrl} target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">
                        Open an issue &rarr;
                      </a>
                    </div>
                  </div>


                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-muted block text-[10px]">Response Time</span>
                      <span className="text-foreground font-medium">Usually within 24–48 hours</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="h-4 w-4 text-primary fill-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-muted block text-[10px]">Leave Feedback</span>
                      <a href="#feedback" className="text-primary font-semibold hover:underline">
                        Share your feedback &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Card */}
              <div className="bg-white border border-border p-6 rounded-xl flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
                  Find Me Online
                </h4>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href={APP_CONFIG.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">Portfolio (sushant.online)</span>
                    </div>
                    <span className="text-xs text-muted">&rarr;</span>
                  </a>

                  <a
                    href={APP_CONFIG.developerGithubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <GithubIcon className="h-4 w-4 text-foreground" />
                      <span className="font-semibold text-foreground">GitHub Profile</span>
                    </div>
                    <span className="text-xs text-muted">&rarr;</span>
                  </a>

                  <a
                    href={APP_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <InstagramIcon className="h-4 w-4 text-pink-600" />
                      <span className="font-semibold text-foreground">Instagram (@sushant.webdev)</span>
                    </div>
                    <span className="text-xs text-muted">&rarr;</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-8 bg-white border border-border p-6 sm:p-10 rounded-xl">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Send a <span className="text-primary">Message.</span>
              </h2>
              <p className="text-sm text-muted mb-8">
                All fields marked with <span className="text-primary font-bold">*</span> are required.
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col items-center text-center gap-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
                  <p className="text-sm text-emerald-700 max-w-md">
                    Thank you for reaching out. We have received your note and will get back to you within 24–48 hours.
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
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name & Email inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="h-11 px-3.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 px-3.5 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Topic Pill Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Select Topic <span className="text-primary">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => {
                        const Icon = t.icon;
                        const isSelected = topic === t.value;
                        return (
                          <button
                            type="button"
                            key={t.value}
                            onClick={() => setTopic(t.value)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                              isSelected
                                ? "bg-primary/10 border-primary text-primary"
                                : "bg-surface border-border text-muted hover:border-muted/40 hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            <span>{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Message <span className="text-primary">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-muted">
                        {message.length} / 2000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      maxLength={2000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your question, issue, or feedback in detail..."
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
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted">
                      Your information is private and never shared.
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
