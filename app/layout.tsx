import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import UploadButton from "@/components/upload-button";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Header />
            {children}
            <footer>
              <p>daily photo - Drew Radcliff © {new Date().getFullYear()}</p>
            </footer>
          </main>
        </body>
      </ClerkProvider>
    </html>
  );
}

function Header() {
  return (
    <header className="flex w-full max-w-5xl items-center justify-between">
      <p>daily photo</p>
      <div className="flex gap-6">
        <UploadButton />
        <UserButton />
      </div>
    </header>
  );
}
