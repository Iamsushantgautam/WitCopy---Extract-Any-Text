import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { APP_CONFIG } from "../../lib/constants";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert,
  Download,
  Scissors,
  ClipboardCheck
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-white border-b border-border">
      <Container>
        {/* Hero Top Content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 mb-14">
          {/* Eyebrow Badge */}
          <Badge variant="primary" className="py-1.5 px-4 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            WitCopy v2.0 Released — 100% On-Device Local AI
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            Extract text from <span className="text-primary underline decoration-primary/30 underline-offset-8">any image or webpage</span> in milliseconds.
          </h1>

          {/* Supporting Description */}
          <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed max-w-2xl">
            The lightweight Chrome extension for developers, researchers, and power users. Snip any uncopyable screen area to paste clean text, code, or tables instantly.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
              onClick={() => window.open(APP_CONFIG.chromeStoreUrl, "_blank")}
            >
              <span>Add to Chrome — Free</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <a href="#showcase" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <span>See How It Works</span>
              </Button>
            </a>
          </div>

          {/* Micro Trust Details */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-muted pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Free 1,000 extractions / month
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              100% Local & Private
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Chrome Web Store Verified
            </span>
          </div>
        </div>

        {/* Product Window: Left Image Card | Right How to Add & Extract Steps Card */}
        <div className="max-w-5xl mx-auto rounded-xl border border-border bg-surface p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Extension Graphic Image ONLY (No container box) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <img
                src="/witcopy.svg"
                alt="WitCopy Chrome Extension Interface"
                className="w-full h-auto max-h-[480px] object-contain"
              />
            </div>


            {/* Right: How to Add & Extract Steps Inside Card Container */}
            <div className="lg:col-span-7 bg-white border border-border p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary block mb-1">
                  QUICK START GUIDE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2">
                  How to Add & Extract Text in 3 Easy Steps
                </h3>
                <p className="text-xs sm:text-sm text-muted mb-5 leading-relaxed">
                  No complex setup required. Install the extension once and start snipping any text on your screen.
                </p>

                {/* Divider Line */}
                <div className="border-t border-border my-5" />

                {/* 3 Steps List */}
                <div className="flex flex-col gap-6">
                  {/* Step 01 */}
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold font-mono text-primary shrink-0 leading-none mt-0.5">
                      01
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                        <Download className="h-4 w-4 text-primary shrink-0" />
                        Add WitCopy to Chrome
                      </h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        Click "Add to Chrome" to install the extension. No registration or credit card needed.
                      </p>
                    </div>
                  </div>

                  {/* Step 02 */}
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold font-mono text-primary shrink-0 leading-none mt-0.5">
                      02
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                        <Scissors className="h-4 w-4 text-primary shrink-0" />
                        Press Alt + S to Snip Any Screen Area
                      </h4>

                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        Drag a selection box over any image, link, or screen area.
                      </p>
                    </div>
                  </div>

                  {/* Step 03 */}
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold font-mono text-primary shrink-0 leading-none mt-0.5">
                      03
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-primary shrink-0" />
                        Paste Clean Text & Code Instantly
                      </h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        Extracted text is automatically formatted and saved to your clipboard in under 42ms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Bar with Divider */}
              <div className="border-t border-border pt-4 mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                <span>Speed: <strong className="text-foreground font-mono">&lt; 42ms</strong></span>
                <span>Accuracy: <strong className="text-primary font-bold">99.9%</strong></span>
                <span className="flex items-center gap-1.5 text-primary font-bold">
                  <ShieldAlert className="h-4 w-4" /> 100% Offline Capable
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
