import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SupportProtocol } from "@/components/SupportProtocol";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siddharth R Kaulagi | Industrial Engineering & Supply Chain Systems",
  description:
    "Portfolio of Siddharth R Kaulagi — Industrial Engineering & Management, Supply Chain Analytics, Inventory Optimization, Procurement, and AI-Assisted Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll />
          <SupportProtocol />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
