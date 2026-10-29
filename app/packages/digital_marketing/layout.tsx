import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Digital Marketing Packages",
  description:
    "Digital marketing packages from Rudhco covering SEO, social media and ads to grow your business in Guwahati and beyond.",
  path: "/packages/digital_marketing/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
