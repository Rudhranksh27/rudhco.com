import type { Metadata } from "next";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

// Child metadata replaces the parent's openGraph/twitter objects wholesale,
// so the shared image and site fields are repeated here.
export function createPageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Rudhco",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/og-banner.jpg",
          width: 1730,
          height: 909,
          alt: "Rudhco Infra & Tech Pvt. Ltd. - Your Trust, Our Foundation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-banner.jpg"],
    },
  };
}
