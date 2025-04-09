import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ThemeProvider} from "next-themes";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reveal on Next',
  description: 'An experiment using the reveal.js presentation framework in a Next application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head/>
      <body>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
      </html>
  )
}
