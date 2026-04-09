import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'DormReady — Dorm Room Dimensions & Layout Guide',
  description:
    'Find exact dorm room dimensions for every school. Plan your layout before move-in day.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans antialiased">
        <header className="border-b border-gray-200 px-4 py-3">
          <a href="/" className="text-lg font-bold tracking-tight text-blue-600">
            DormReady
          </a>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DormReady. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
