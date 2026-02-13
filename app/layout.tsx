// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mulubahzumu Kemmeh Sipor - Software Developer',
  description: 'Portfolio of Mulubahzumu Kemmeh Sipor, specializing in digital infrastructure and full-stack development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Moved lang and suppressHydrationWarning to the html tag
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}