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

import { getMetadata } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata()
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
        {/* * TODO: Migrate mask-icon to Metadata object when NextJS support color attribute https://github.com/vercel/next.js/issues/52853 */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0ea5e9" />
      </head>
      <body className={bodyCls}>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  )
}
