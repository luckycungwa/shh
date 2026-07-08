"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <span className="text-3xl">!</span>
        </div>
        <h1 className="text-3xl font-black">Something went wrong</h1>
        <p className="text-gray-500">We encountered an unexpected error. Please try again.</p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold bg-primary-gold text-primary-black hover:bg-primary-gold-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
