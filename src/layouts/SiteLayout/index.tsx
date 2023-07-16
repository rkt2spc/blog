import { PropsWithChildren } from 'react'
import Container from '@/components/Container'
import Header from './Header'
import Footer from './Footer'

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Container className="w-full mb-auto">
        <main className="md:pr-2">{children}</main>
      </Container>
      <Footer />
    </div>
  )
}
