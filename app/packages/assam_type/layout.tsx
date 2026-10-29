import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Assam Type House Packages",
  description:
    "Assam type house construction packages by Rudhco, combining traditional design with durable materials and clear pricing in Guwahati.",
  path: "/packages/assam_type/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
