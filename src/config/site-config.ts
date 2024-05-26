export const siteConfig = {
  metadataBase: new URL("https://muswaddaty.vercel.app"),
  title: {
    default: "Muswaddaty",
    template: "%s | Muswaddaty",
  },

  manifest: "/site.webmanifest",

  applicationName: "Muswaddaty",

  creator: "Mohamed Lifa",

  authors: [
    {
      name: "Mohamed Lifa",
      url: "https://mohamed-lifa7.vercel.app",
    },
    {
      name: "Hafsi Ahmed",
    },
    {
      name: "Mohmoudi Assim",
    },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "Muswaddaty allows seamless team collaboration on documents in real-time through cloud-based workspaces.",

  openGraph: {
    title: "Muswaddaty",
    description:
      "Muswaddaty allows seamless team collaboration on documents in real-time through cloud-based workspaces.",
    siteName: "Muswaddaty",
    locale: "en_US",
    url: new URL("https://muswaddaty.vercel.app"),
    images: ["https://muswaddaty.vercel.app/og-image.png"],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  twitter: {
    title: "Muswaddaty",
    creator: "@LifaSeddik",
    card: "summary_large_image",
    images: ["https://muswaddaty.vercel.app/twitter-og-image.png"],
  },
};

export const links = {
  github: "https://github.com/mohamed-lifa7/muswaddaty",
  twitter: "https://twitter.com/LifaSeddik",
  portfolio: "https://mohamed-lifa7.vercel.app",
};