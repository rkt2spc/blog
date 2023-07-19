import 'server-only'

import fs from 'fs'
import path from 'path'

import dedent from 'dedent'

import { PostMetadata } from '@/types'

import { getAllPostsMetadata, getAllPostsTag, getPostsMetadataByTag } from '@/lib/mdx'
import { htmlEscape as escape } from '@/lib/util'

import { siteMetadata } from '@/data'

async function generatePostsRSS(postsMetadata: PostMetadata[], path: string): Promise<string> {
  const { title, description, author, contact, locale, host } = siteMetadata
  const { email } = contact
  const lastBuildDate = postsMetadata.length > 0 ? new Date(postsMetadata[0].date) : new Date()

  const items = postsMetadata.map((postMd) =>
    `
        <item>
          <guid>${host}/blog/${postMd.slug}</guid>
          <title>${escape(postMd.title)}</title>
          <link>${host}/blog/${postMd.slug}</link>
          ${postMd.summary && `<description>${escape(postMd.summary)}</description>`}
          <pubDate>${new Date(postMd.date).toUTCString()}</pubDate>
          <author>${email} (${author})</author>
          ${postMd.tags && postMd.tags.map((t) => `<category>${t}</category>`).join('')}
        </item>`.replace('\n', '')
  )

  return dedent(`
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escape(title)}</title>
        <link>${host}/blog</link>
        <description>${escape(description)}</description>
        <language>${locale.toLowerCase()}</language>
        <managingEditor>${email} (${author})</managingEditor>
        <webMaster>${email} (${author})</webMaster>
        <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
        <atom:link href="${host}${path}" rel="self" type="application/rss+xml"/>
${items.join('\n')}
      </channel>
    </rss>
  `).trim()
}

const ROOT_DIRECTORY = process.cwd()
const PUBLIC_DIRECTORY = path.join(ROOT_DIRECTORY, 'public')

export default async function generateRSS() {
  const allPostsMetadata = await getAllPostsMetadata()

  const rssName = 'feed.xml'

  const rssPath = `/${rssName}`
  const rss = await generatePostsRSS(allPostsMetadata, rssPath)
  fs.writeFileSync(path.join(PUBLIC_DIRECTORY, rssPath), rss)

  const allTags = await getAllPostsTag()
  for (const tag in allTags) {
    const tagPosts = await getPostsMetadataByTag(tag)

    const tagRssPath = `/tags/${tag}/${rssName}`
    const tagRss = await generatePostsRSS(tagPosts, tagRssPath)

    const tagRssFile = path.join(PUBLIC_DIRECTORY, tagRssPath)
    fs.mkdirSync(path.dirname(tagRssFile), { recursive: true })
    fs.writeFileSync(tagRssFile, tagRss)
  }
}
