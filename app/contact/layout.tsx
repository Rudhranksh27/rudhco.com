import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Rudhco Infra & Tech Pvt. Ltd. in Guwahati for a free consultation or quote on construction, interiors or digital services. Call +91 98646 58393.",
  path: "/contact/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
