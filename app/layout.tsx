import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Self-Appraisal",
  description: "To evaluate yourself for better performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
