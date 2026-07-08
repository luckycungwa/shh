import NextLink from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center max-w-md space-y-6">
        <p className="text-8xl font-black text-primary-gold">404</p>
        <h1 className="text-3xl font-black">Page Not Found</h1>
        <p className="text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <NextLink
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary-gold text-primary-black hover:bg-primary-gold-light transition-colors"
        >
          <FaHome /> Back to Home
        </NextLink>
      </div>
    </div>
  );
}
