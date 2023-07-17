'use client'

import { ComponentType, HTMLAttributes } from 'react'
import Link from '@/components/Link'
import Email from './email.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'

import { SocialRef } from '@/types'

const components: { [key: string]: ComponentType<HTMLAttributes<SVGElement>> } = {
  email: Email,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

type SocialLinkIconProps = SocialRef & {
  size: number
}

const emailPattern = /^(mailto:)?\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/

export default function SocialLinkIcon({ kind, href, size = 8 }: SocialLinkIconProps) {
  if (!href || (kind === 'email' && !emailPattern.test(href))) {
    return null
  }

  const SocialSvg = components[kind]

  return (
    <Link
      className="text-sm hover:text-blue-500 dark:hover:text-sky-400"
      rel="noopener noreferrer"
      href={kind === 'email' && !href.startsWith('mailto:') ? `mailto:${href}` : href}
    >
      <SocialSvg className={`h-${size} w-${size} inline`} />
    </Link>
  )
}
