import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import { SocialProvider } from '@/lib/social-context'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Горные туры Алматы - Mountain Tours Almaty',
  description: 'Профессиональные горные туры в Алматы. Исследуйте красоту казахских гор с опытными гидами.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-gray-50`}>
        <LanguageProvider>
          <SocialProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </SocialProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}