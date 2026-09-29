import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motionConfig } from "@/config/motion";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Trustworthy AI & Machine Learning`, template: `%s · ${site.name}` },
  description: "Research and scientific software by Abdolamir Karbalaie: clinical AI, rigorous model validation, uncertainty, and reproducible machine learning.",
  keywords: [
    "Abdolamir Karbalaie",
    "Data Scientist",
    "Machine Learning Researcher",
    "TrustCV",
    "Karolinska Institutet",
    "Clinical AI",
    "Model Validation",
    "Biomedical Engineering",
    "Sweden",
  ],
  authors: [{ name: site.name, url: site.links.github }],
  openGraph: {
    title: `${site.name} — Trustworthy AI & Machine Learning`,
    description: "Research and scientific software by Abdolamir Karbalaie: clinical AI, rigorous model validation, uncertainty, and reproducible machine learning.",
    type: "website",
    locale: "en_US",
    siteName: `${site.name} Portfolio`,
    images: [{ url: site.portrait, width: 800, height: 1000, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Trustworthy AI & Machine Learning`,
    description: "Research and scientific software by Abdolamir Karbalaie: clinical AI, rigorous model validation, uncertainty, and reproducible machine learning.",
    images: [site.portrait],
  },
};

const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t||'${site.defaultTheme}'}catch(e){document.documentElement.dataset.theme='${site.defaultTheme}'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={site.defaultTheme}
      data-motion={motionConfig.enabled ? "on" : "off"}
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
      style={{ "--ease": motionConfig.ease } as React.CSSProperties}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
