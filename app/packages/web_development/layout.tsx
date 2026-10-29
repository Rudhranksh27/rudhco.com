import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Web Development Packages",
  description:
    "Affordable website design and web development packages from Rudhco for businesses in Guwahati and across India.",
  path: "/packages/web_development/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
