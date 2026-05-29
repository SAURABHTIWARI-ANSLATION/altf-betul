"use client";

import { usePathname } from "next/navigation";
import Footer from "@/platform/navigation/Footer";
import { isPublicShellFooterHidden } from "@/platform/navigation/siteRoutes";

export default function RouteFooter() {
  const pathname = usePathname();

  if (isPublicShellFooterHidden(pathname)) {
    return null;
  }

  return <Footer />;
}
