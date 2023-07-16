import ThemeSwitch from '@/components/ThemeSwitch'
import Nav from './Nav'
import MobileNav from './MobileNav'

import headerNavLinks from '@/data/navLinks.json'

export default function Header() {
  return (
    <header className="flex items-center justify-end sm:justify-between pt-4 pb-4 sm:pb-8">
      <Nav links={headerNavLinks} />
      <ThemeSwitch />
      <MobileNav links={headerNavLinks} />
    </header>
  )
}
