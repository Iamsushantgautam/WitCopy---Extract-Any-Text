import { useState, useEffect } from "react";
import { LandingPage } from "../pages/LandingPage";
import { ContactPage } from "../pages/ContactPage";
import { FeedbackPage } from "../pages/FeedbackPage";

export function AppRoutes() {
  const [currentLocation, setCurrentLocation] = useState<string>(
    () => window.location.pathname + window.location.hash
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentLocation(window.location.pathname + window.location.hash);
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (
        hash === "#contact" ||
        hash === "#feedback" ||
        path.includes("/contact") ||
        path.includes("/feedback")
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const loc = currentLocation.toLowerCase();

  if (loc.includes("/contact") || loc.includes("#contact") || loc.includes("#/contact")) {
    return <ContactPage />;
  }

  if (loc.includes("/feedback") || loc.includes("#feedback") || loc.includes("#/feedback")) {
    return <FeedbackPage />;
  }

  return <LandingPage />;
}
