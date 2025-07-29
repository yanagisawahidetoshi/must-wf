import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Tabemono - 日本の絶対食べるべきローカルフード",
  description: "訪日外国人観光客向けの日本各地の必食グルメガイド。現地の人のように注文して、本物の日本食体験を。",
  keywords: "日本料理, グルメ, 観光, 東京, 大阪, 京都, ラーメン, 寿司",
  authors: [{ name: "Tabemono Team" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#FFC107",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Tabemono - 日本の絶対食べるべきローカルフード",
    description: "日本各地の必食グルメを発見し、現地の人のように注文しよう",
    type: "website",
    locale: "ja_JP",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
