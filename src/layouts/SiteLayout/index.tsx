import { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex h-screen flex-col justify-between">
        <Header />
        <main className="mb-auto md:pr-2">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
