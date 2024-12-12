import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Algorithm Visualizer',
  description: 'Interactive algorithm visualization and learning platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}