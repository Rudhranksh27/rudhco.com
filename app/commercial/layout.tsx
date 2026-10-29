import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Commercial Construction in Guwahati",
  description:
    "Commercial building and construction services in Guwahati and Assam, from offices to retail spaces, delivered by Rudhco Infra & Tech.",
  path: "/commercial/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
