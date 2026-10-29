import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Commercial Construction Packages",
  description:
    "View Rudhco's commercial construction packages in Guwahati, designed for offices, shops and business spaces with transparent pricing.",
  path: "/packages/commercial/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
