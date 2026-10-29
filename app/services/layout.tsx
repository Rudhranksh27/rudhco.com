import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Services",
  description:
    "Explore Rudhco's services: construction (residential and commercial), interiors, plus digital services including web development and digital marketing, across Guwahati and Assam.",
  path: "/services/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
