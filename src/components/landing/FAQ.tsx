import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FAQ_ITEMS } from "../../data/landing";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full py-20 md:py-28 bg-white border-b border-border">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Everything you need to know about WitCopy."
          description="Have questions? We have got answers. If you need further help, feel free to reach out."
          align="center"
          className="mb-16"
        />

        {/* Accessible Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col border-t border-border">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const contentId = `faq-content-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className="border-b border-border">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between py-6 text-left font-bold text-lg sm:text-xl text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
                  >
                    <span>{item.question}</span>
                    <div className="p-1 rounded-md bg-surface border border-border text-foreground ml-4 shrink-0">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-primary" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 py-0 opacity-0"
                  }`}
                >
                  <p className="text-base text-muted leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
