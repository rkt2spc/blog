import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/site.css'
import 'katex/dist/katex.css'

import { Metadata } from 'next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

import { PropsWithChildren } from 'react'
import SiteLayout from '@/layouts/SiteLayout'
import Providers from './providers'

export const metadata: Metadata = {
  title: `Tuan's Corner`,
  description: `<3`,
}

export default function RootLayout({ children }: PropsWithChildren) {
  const colorTransitionCls = [
    'transition',
    'ease-in-out',
    'duration-200',
    'motion-reduce:transition-none',
  ]
    .join(' ')
    .trim()

  const htmlCls = ['scroll-smooth', outfit.variable].join(' ')

  const bodyCls = [
    'antialiased',
    'bg-white dark:bg-neutral-900',
    'text-black dark:text-white',
    colorTransitionCls,
  ]
    .join(' ')
    .trim()

  return (
    <html lang="en" className={htmlCls} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={bodyCls}>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  )
}
