import { Inter } from "next/font/google";
import "@/public/css/all.css/style.css";
import BootstrapClient from "@/components/BootstrapClient";
import Nav from "@/components/Nav";

export const metadata = {
  title: "islah web site",
  description: "reporting system for citizens",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Nav />
      <body>{children}</body>
    </html>
  );
}
