import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { APP_CONFIG } from "../../lib/constants";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="w-full py-20 md:py-28 bg-surface border-t border-b border-border text-foreground">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-semibold text-primary tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Start Extracting Text In Seconds
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            Ready to stop manually typing text from screens?
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            Join over 50,000+ developers, researchers, and creators using WitCopy to instant-snip text from images, links, and screen areas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
              onClick={() => window.open(APP_CONFIG.chromeStoreUrl, "_blank")}
            >
              <span>Add to Chrome — It's Free</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <a
              href={APP_CONFIG.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-border bg-white text-foreground hover:bg-surface"
              >
                <span>View on GitHub</span>
              </Button>
            </a>
          </div>

          {/* Micro Note */}
          <div className="flex items-center gap-2 text-xs text-muted pt-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>100% Free Tier • No Account Required • Privacy Guaranteed</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
