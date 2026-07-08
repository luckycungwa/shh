"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PageLoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const prevPath = React.useRef(pathname);

  React.useEffect(() => {
    if (prevPath.current !== pathname) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      prevPath.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 pointer-events-none">
      <div
        className={`h-full bg-gradient-to-r from-primary-gold via-yellow-400 to-primary-gold transition-all duration-300 ease-out ${
          loading ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
        style={{
          animation: loading ? "loadingBar 0.8s ease-out" : "none",
          boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)",
        }}
      />
      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          20% { width: 30%; }
          50% { width: 60%; }
          80% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
