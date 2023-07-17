export type SocialRef = {
  kind: 'email' | 'github' | 'facebook' | 'youtube' | 'linkedin' | 'twitter'
  href: string
}

export type AuthorMetadata = {
  name: string
  avatar: string
  occupation: string
  company: string
  socials: SocialRef[]
}

export type Author = {
  mdxCode: string
  metadata: AuthorMetadata
}
