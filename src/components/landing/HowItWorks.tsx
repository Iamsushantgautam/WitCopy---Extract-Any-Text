import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { HOW_IT_WORKS_STEPS } from "../../data/landing";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20 md:py-28 bg-surface border-b border-border">
      <Container>
        {/* Heading */}
        <SectionHeading
          eyebrow="Quick Setup Guide"
          title="Installation & Setup in Minutes."
          description="Follow these step-by-step instructions to load WitCopy unpacked into Google Chrome."
          align="center"
          className="mb-16"
        />

        {/* Steps Grid (5 steps responsive grid layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="flex flex-col gap-3 relative"
            >
              {/* Top Step Row with Number & Border */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight">
                  {step.step}
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase text-muted bg-white border border-border px-2 py-0.5 rounded">
                  Step {index + 1}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {step.description}
              </p>

              <p className="text-[11px] text-muted pt-2 border-t border-dashed border-border mt-auto">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
