export type Link = {
  title: string
  href: string
}

export type NavLinks = Record<string, Link>

export type PostMetadata = {
  slug: string
  title: string
  date: Date
  summary: string
  thumbnail: string
  readingMinutes: number
  tags: string[]
  draft: boolean
}
