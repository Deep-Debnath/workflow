import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskFlow | Workflow Management App",
  description:
    "TaskFlow is a modern workflow management app built with Next.js, Redux Toolkit, and MUI. Easily organize, track, and complete your daily tasks with an intuitive UI and powerful features.",
  keywords: [
    "TaskFlow",
    "Workflow App",
    "Task Manager",
    "Productivity",
    "Next.js",
    "Redux Toolkit",
    "MUI",
    "Deep Debnath",
  ],
  authors: [{ name: "Deep Debnath", url: "https://github.com/deep-debnath" }],
  creator: "Deep Debnath",
  publisher: "TaskFlow",
  metadataBase: new URL(
    "https://workflow-pabp2okw3-deepvais-projects.vercel.app/"
  ),
  openGraph: {
    title: "TaskFlow | Workflow Management App",
    description:
      "Boost productivity with TaskFlow — a clean and powerful workflow management app built using Next.js, Redux Toolkit, and MUI.",
    url: "https://workflow-pabp2okw3-deepvais-projects.vercel.app/",
    siteName: "TaskFlow",
    images: [
      {
        url: "globe.svg", // not confirmed
        width: 1200,
        height: 630,
        alt: "TaskFlow App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
