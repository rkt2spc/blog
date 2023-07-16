'use client'

import { ReactElement } from 'react'
import Link from '@/components/Link'
import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'

const components: { [key: string]: ReactElement } = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

type SocialLinkIconProps = {
  kind: 'mail' | 'github' | 'facebook' | 'youtube' | 'linkedin' | 'twitter'
  href: string
  size: number
}

export default function SocialLinkIcon({ kind, href, size = 8 }: SocialLinkIconProps) {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <Link
      className="text-sm text-gray-500 transition hover:text-gray-600"
      rel="noopener noreferrer"
      href={href}
    >
      <SocialSvg className={`h-${size} w-${size} inline`} />
    </Link>
  )
}
