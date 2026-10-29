import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Digital Marketing Services",
  description:
    "Grow your brand online with Rudhco's digital marketing services: SEO, social media, paid ads and web development in Guwahati.",
  path: "/digital_marketing/digital_home/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
