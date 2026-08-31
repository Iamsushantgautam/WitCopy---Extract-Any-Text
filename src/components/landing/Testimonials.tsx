import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { TESTIMONIALS } from "../../data/landing";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-20 md:py-28 bg-surface border-b border-border">
      <Container>
        {/* Heading */}
        <SectionHeading
          eyebrow="User Feedback"
          title="Loved by engineers, researchers & power users."
          description="Here is what professionals are saying about WitCopy in their daily workflows."
          align="center"
          className="mb-16"
        />

        {/* Testimonials List (Editorial layout separated by borders, NO shadows/cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border border-t border-b border-border py-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-6 p-4 sm:p-6"
            >
              <div className="flex flex-col gap-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-base sm:text-lg text-foreground leading-relaxed italic relative">
                  <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2 -z-10" />
                  “{item.quote}”
                </blockquote>
              </div>

              {/* Customer Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                  {item.avatarText}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    {item.author}
                  </span>
                  <span className="text-xs text-muted">
                    {item.role} • {item.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
