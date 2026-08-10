"use client";

import React, { useState, useEffect } from "react";

const INVOKE_SRC = "https://pl30681104.effectivecpmnetwork.com/a1cf66fbb77a5290f9be40bb65ba010a/invoke.js";
const CONTAINER_ID = "container-a1cf66fbb77a5290f9be40bb65ba010a";
const SCRIPT_ID = "effectivecpm-invoke";

// Disabled by default while the site goes through Google AdSense review.
// Re-enable only after approval by setting NEXT_PUBLIC_ENABLE_EFFECTIVECPM=true.
const ENABLED = process.env.NEXT_PUBLIC_ENABLE_EFFECTIVECPM === "true";

function getConsent(): boolean {
  try {
    return localStorage.getItem("cookie-consent") === "granted";
  } catch (e) {
    return false;
  }
}

export default function AdNetworkLoader() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (!ENABLED) return;
    setConsented(getConsent());
    const onConsent = () => setConsented(getConsent());
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  useEffect(() => {
    if (!ENABLED || !consented) return;
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = INVOKE_SRC;
    document.body.appendChild(script);
  }, [consented]);

  if (!ENABLED || !consented) return null;

  return (
    <div className="my-12 w-full flex justify-center" aria-hidden="false">
      <div id={CONTAINER_ID} className="min-h-[100px] w-full max-w-3xl" />
    </div>
  );
}
