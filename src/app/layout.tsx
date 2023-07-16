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
    'transition-colors',
    'ease-in-out',
    'duration-150',
    'motion-reduce:transition-none',
  ]
    .join(' ')
    .trim()

  const htmlCls = ['scroll-smooth', 'stable-scrollbar-gutter', outfit.variable].join(' ')

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
      <head />
      <body className={bodyCls}>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  )
}
