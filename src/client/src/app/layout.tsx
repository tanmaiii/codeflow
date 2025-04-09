import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const roboto = Nunito({
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code Flow",
  description: "A code review tool for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
