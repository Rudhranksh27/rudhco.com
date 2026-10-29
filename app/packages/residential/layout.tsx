import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Residential Construction Packages",
  description:
    "Compare Rudhco's residential construction packages in Guwahati, with clear per-square-foot pricing and inclusions for your dream home.",
  path: "/packages/residential/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
