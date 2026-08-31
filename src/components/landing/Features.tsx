import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { EDITORIAL_FEATURES } from "../../data/landing";
import { ArrowRight } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="w-full py-20 md:py-28 bg-surface border-b border-border">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Core Capabilities"
          title="Everything you need to extract text from any screen element."
          description="WitCopy replaces manual re-typing and clunky cloud OCR APIs with zero-latency, on-device screen intelligence."
          align="left"
          className="mb-14"
        />

        {/* Editorial Features List Layout (NO CARDS, using dividers & clean editorial rows) */}
        <div className="flex flex-col border-t border-border">
          {EDITORIAL_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group border-b border-border py-8 sm:py-10 transition-colors hover:bg-white px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Step Number & Tag */}
                  <div className="md:col-span-3 flex items-center md:flex-col md:items-start justify-between md:justify-start gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-primary tracking-tight">
                      {feature.number}
                    </span>
                    {feature.tag && (
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-muted bg-white border border-border px-2 py-0.5 rounded">
                        {feature.tag}
                      </span>
                    )}
                  </div>

                  {/* Title & Icon */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="p-2 rounded-md bg-white border border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description & Action Indicator */}
                  <div className="md:col-span-5 flex items-start justify-between gap-4">
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {feature.description}
                    </p>
                    <ArrowRight className="h-5 w-5 text-border group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
