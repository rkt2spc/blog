import Image from 'next/image'
import SocialLinkIcon from '@/components/SocialLinkIcon'

import { AuthorMetadata } from '@/types'
import { PropsWithChildren } from 'react'

type AuthorLayoutProps = PropsWithChildren & {
  authorMetadata: AuthorMetadata
}

export default function AuthorLayout({ authorMetadata, children }: AuthorLayoutProps) {
  const { name, avatar, occupation, company, socials } = authorMetadata

  return (
    <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
      <div className="flex flex-col items-center pt-8 xl:sticky xl:top-12">
        <Image
          src={avatar}
          alt="avatar"
          width={192}
          height={192}
          className="h-48 w-48 rounded-full"
        />
        <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
        {occupation && <div className="text-gray-500 dark:text-gray-400">{occupation}</div>}
        {company && <div className="text-gray-500 dark:text-gray-400">{company}</div>}
        <div className="flex space-x-3 pt-4 text-gray-700 dark:text-gray-200">
          {socials.map(({ kind, href }) => (
            <SocialLinkIcon key={`${kind}:${href}`} size={8} kind={kind} href={href} />
          ))}
        </div>
      </div>
      <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
    </div>
  )
}
