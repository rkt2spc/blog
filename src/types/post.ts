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

export type Post = {
  mdxCode: string
  metadata: PostMetadata
}
