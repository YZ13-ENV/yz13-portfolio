import TravelWatcher from '@/components/entities/travel/watcher'
import './globals.css'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400', '300', '200'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'YZ13',
  description: 'Created by DM Family',
}

export default function RootLayout({ children }: { children: JSX.Element }) {
    return (
      <html lang="en" className={`${first_font.className} ${first_font.variable}`}>
        <body className='min-h-screen dark'>
          <TravelWatcher />
          {children}
        </body>
      </html>
    )
}
