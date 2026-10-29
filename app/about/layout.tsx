import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Rudhco Infra & Tech Pvt. Ltd., a Guwahati-based company offering construction, interiors and digital services like web development and digital marketing.",
  path: "/about/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
