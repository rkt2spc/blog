import { PropsWithChildren } from 'react'
import Container from '@/components/Container'
import Header from './Header'
import Footer from './Footer'

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <Container className="flex h-screen flex-col justify-between">
        <main className="mb-auto md:pr-2">{children}</main>
        <Footer />
      </Container>
    </div>
  )
}
