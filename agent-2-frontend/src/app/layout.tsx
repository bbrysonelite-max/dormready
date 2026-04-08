import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DormReady — Know Your Dorm Room Before You Arrive',
  description: 'Search dorm room dimensions, layouts, and move-in guides for top universities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
