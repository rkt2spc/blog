export type Link = {
  title: string
  href: string
}

export type NavLinks = Record<string, Link>

export type Batch = {
  offset: number
  limit: number
}

export type { PostMetadata, Post } from './post'
export type { AuthorMetadata, Author, SocialRef } from './author'
