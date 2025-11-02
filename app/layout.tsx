import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Contacts & Tasks Assessment',
  description: 'Next.js 14 App Router TypeScript assessment app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="bg-white border-b p-4 sticky top-0">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="font-semibold text-lg">Contacts & Tasks</h1>
            <nav aria-label="Main">
              <a href="/" className="mr-3">Home</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
