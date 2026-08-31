import { useState, useEffect } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS } from "../../data/landing";
import { APP_CONFIG } from "../../lib/constants";
import { Menu, X } from "lucide-react";
import logoImg from "../../assets/logo.png";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 bg-white border-b border-border ${
        isScrolled ? "bg-white/95 backdrop-blur-sm" : ""
      }`}
    >
      <Container className="flex h-18 items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
        >
          <img
            src={logoImg}
            alt="WitCopy Logo"
            className="h-9 w-9 object-contain rounded-lg transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground leading-none">
              {APP_CONFIG.name}
            </span>
            <span className="text-[10px] font-medium tracking-wide text-muted uppercase">
              Extract Any Text
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1.5 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
            onClick={() => window.open(APP_CONFIG.chromeStoreUrl, "_blank")}
          >
            Get Extension
          </Button>

          <IconButton
            variant="ghost"
            size="md"
            className="lg:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </IconButton>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
