import 'server-only'

import fs from 'fs'
import path from 'path'

import { bundleMDX } from 'mdx-bundler'
import readingTime from 'reading-time'

import remarkGfm from 'remark-gfm'
import remarkCodeTitles from './plugins/remark-code-titles'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkMdxImages from 'remark-mdx-images'

import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'

import { kebabCase, uniq } from '@/lib/util'
import { Post } from '@/types'

import { CACHE_KEY_POSTS } from './constants'
import { cache } from './caches'
import { DIRECTORY_ROOT, DIRECTORY_DATA_POSTS, DIRECTORY_PUBLIC_STATIC } from './constants'

export default async function getPostBySlug(slug: string): Promise<Post> {
  const cacheKey = `${CACHE_KEY_POSTS}[slug:${slug}]`

  const cachedPost = cache.get<Post>(cacheKey)
  if (cachedPost) {
    return cachedPost
  }

  const mdxSourcePath = [
    path.join(DIRECTORY_DATA_POSTS, `${slug}.mdx`),
    path.join(DIRECTORY_DATA_POSTS, `${slug}.md`),
    path.join(DIRECTORY_DATA_POSTS, `${slug}/index.mdx`),
    path.join(DIRECTORY_DATA_POSTS, `${slug}/index.md`),
  ].find(fs.existsSync)

  const mdxSource = mdxSourcePath ? fs.readFileSync(mdxSourcePath, 'utf8') : ''

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(DIRECTORY_ROOT, 'node_modules/esbuild/esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(DIRECTORY_ROOT, 'node_modules/esbuild/bin/esbuild')
  }

  const cwd = mdxSourcePath ? path.dirname(mdxSourcePath) : DIRECTORY_DATA_POSTS

  const { code, frontmatter } = await bundleMDX({
    cwd: cwd,
    source: mdxSource,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkMdxImages,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }],
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.outdir = path.join(DIRECTORY_PUBLIC_STATIC, 'blog', slug, 'images')
      options.loader = {
        ...options.loader,
        '.svg': 'dataurl',
        '.png': 'file',
        '.jpg': 'file',
        '.webp': 'file',
      }
      options.publicPath = path.join('/static', 'blog', slug)
      options.write = true

      return options
    },
  })

  const { title, date, summary, thumbnail, tags, draft } = frontmatter
  const readingMinutes = readingTime(mdxSource).minutes

  if (!title || !date || !summary) {
    throw new Error(`post[${slug}] is missing metadata`)
  }

  const normalizedTags = uniq((tags || []).map((tag: string) => kebabCase(tag)))

  const post: Post = {
    mdxCode: code,
    metadata: {
      slug: slug,
      title: title,
      date: new Date(date),
      summary: summary,
      thumbnail: thumbnail || '',
      readingMinutes: readingMinutes,
      tags: normalizedTags,
      draft: draft || false,
    },
  }

  cache.set(cacheKey, post)
  return post
}
