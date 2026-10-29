import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Residential Construction in Guwahati",
  description:
    "Custom home construction in Guwahati and Assam by Rudhco, with transparent pricing, quality materials and on-time delivery.",
  path: "/residential/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
