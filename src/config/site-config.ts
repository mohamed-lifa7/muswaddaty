export const siteConfig = {
  metadataBase: new URL("https://muswaddati.vercel.app"),
  title: {
    default: "Muswaddati",
    template: "%s | Muswaddati",
  },

  manifest: "/site.webmanifest",

  applicationName: "Muswaddati",

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
    "Muswaddati allows seamless team collaboration on documents in real-time through cloud-based workspaces.",

  openGraph: {
    title: "Muswaddati",
    description:
      "Muswaddati allows seamless team collaboration on documents in real-time through cloud-based workspaces.",
    siteName: "Muswaddati",
    locale: "en_US",
    url: new URL("https://muswaddati.vercel.app"),
    images: ["https://muswaddati.vercel.app/og-image.png"],
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
    title: "Muswaddati",
    creator: "@LifaSeddik",
    card: "summary_large_image",
    images: ["https://muswaddati.vercel.app/twitter-og-image.png"],
  },
};

export const links = {
  github: "https://github.com/mohamed-lifa7/muswaddati",
  twitter: "https://twitter.com/LifaSeddik",
  portfolio: "https://mohamed-lifa7.vercel.app",
};