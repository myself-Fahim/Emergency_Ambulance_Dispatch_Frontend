import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import Provider from "../providers";

export const metadata: Metadata = {
  title: "Ambulancia | Emergency dispatch",
  description: "A connected emergency ambulance dispatch network.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
