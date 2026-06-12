"use client";

import React, { useEffect } from "react";

// TikTok bio links open in its in-app browser, where Smart App Banners never
// render. Opening a page with ?src=tiktok hops straight to the App Store with
// TikTok campaign attribution; if the script doesn't run (crawlers, JS off),
// the normal page with its visible App Store button is the fallback.
export const TikTokRedirect: React.FC<{ href: string }> = ({ href }) => {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("src") === "tiktok") {
      window.location.replace(href);
    }
  }, [href]);

  return null;
};
