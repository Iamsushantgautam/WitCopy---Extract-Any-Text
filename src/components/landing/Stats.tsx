import { Container } from "../ui/Container";
import { STATS_ITEMS } from "../../data/landing";

export function Stats() {
  return (
    <section id="stats" className="w-full py-20 bg-white border-b border-border">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-border border-y border-border py-8">
          {STATS_ITEMS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 sm:p-8"
            >
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-none mb-3">
                <span className="text-primary">{stat.value}</span>
              </span>

              <span className="text-base sm:text-lg font-bold text-foreground mb-1">
                {stat.label}
              </span>

              <span className="text-xs sm:text-sm text-muted">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
