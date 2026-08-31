import { useEffect } from "react";
import { NAV_ITEMS } from "../../data/landing";
import { APP_CONFIG } from "../../lib/constants";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-18 bottom-0 z-50 bg-white border-b border-border lg:hidden flex flex-col justify-between overflow-y-auto p-6 transition-all duration-200">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-3">
          Navigation
        </span>
        <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-3 rounded-md text-lg font-medium text-foreground hover:bg-surface active:bg-surface-hover transition-colors"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-muted" />
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3 pt-6 border-t border-border mt-6">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => {
            onClose();
            window.open(APP_CONFIG.chromeStoreUrl, "_blank");
          }}
        >
          Get Started — Add to Chrome
        </Button>
        <p className="text-center text-xs text-muted">
          100% Free • No credit card required • Local AI
        </p>
      </div>
    </div>
  );
}
