import Container from '@/components/Container'
import ThemeSwitch from '@/components/ThemeSwitch'
import Nav from './Nav'
import MobileNav from './MobileNav'

import headerNavLinks from '@/data/navLinks.json'

export default function Header() {
  const cls = [
    'py-4 sm:mb-4',
    'w-full',
    'sticky top-0 z-40',
    'backdrop-blur bg-white/75 dark:bg-neutral-900/75',
  ]
    .join(' ')
    .trim()

  return (
    <header className={cls}>
      <Container className="flex items-center justify-end sm:justify-between">
        <Nav links={headerNavLinks} />
        <ThemeSwitch />
        <MobileNav links={headerNavLinks} />
      </Container>
    </header>
  )
}
