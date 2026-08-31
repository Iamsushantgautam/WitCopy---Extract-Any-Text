import { Container } from "../ui/Container";
import { Divider } from "../ui/Divider";
import { FOOTER_COLUMNS } from "../../data/landing";
import { APP_CONFIG } from "../../lib/constants";
import { Heart } from "lucide-react";
import { GithubIcon, InstagramIcon, GlobeIcon } from "../ui/BrandIcons";
import logoImg from "../../assets/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface border-t border-border pt-16 pb-12">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12">
          {/* Brand Info (2 columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="WitCopy Logo"
                className="h-9 w-9 object-contain rounded-lg"
              />
              <span className="text-xl font-bold tracking-tight text-foreground">
                {APP_CONFIG.name}
              </span>
            </a>

            <p className="text-sm text-muted leading-relaxed max-w-sm">
              The high-speed, 100% private on-device text extractor for Chrome. Capture code, links, and text from any image or webpage in milliseconds.
            </p>

            {/* Real Colored Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={APP_CONFIG.developerGithubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-100 transition-all shadow-xs"
                aria-label="Developer GitHub Profile"
                title="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4 text-slate-900" />
              </a>
              <a
                href={APP_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-pink-200 bg-pink-50/60 text-pink-600 hover:border-pink-300 hover:bg-pink-100/80 transition-all shadow-xs"
                aria-label="Instagram Account @sushant.webdev"
                title="Instagram @sushant.webdev"
              >
                <InstagramIcon className="h-4 w-4 text-pink-600" />
              </a>
              <a
                href={APP_CONFIG.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/60 text-primary hover:border-blue-300 hover:bg-blue-100/80 transition-all shadow-xs"
                aria-label="Portfolio Website sushant.online"
                title="Portfolio Website (sushant.online)"
              >
                <GlobeIcon className="h-4 w-4 text-primary" />
              </a>
            </div>

          </div>

          {/* Nav Columns (4 columns on desktop) */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted">
          <div className="flex items-center gap-1">
            <span>© {currentYear} {APP_CONFIG.name}. Built with</span>
            <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
            <span>by <a href={APP_CONFIG.portfolioUrl} target="_blank" rel="noreferrer" className="text-foreground font-semibold hover:underline">Sushant Gautam</a>.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href={APP_CONFIG.portfolioUrl} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              Portfolio (sushant.online)
            </a>
            <a href={APP_CONFIG.developerGithubUrl} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              GitHub Profile
            </a>
            <a href={APP_CONFIG.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              Instagram (@sushant.webdev)
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
