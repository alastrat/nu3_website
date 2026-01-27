import type { ReactNode } from "react";

// Root layout - just a passthrough for the [locale] layout
// The middleware handles locale detection and routing
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
