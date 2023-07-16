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

import { DIRECTORY_ROOT, DIRECTORY_DATA_POSTS, DIRECTORY_PUBLIC_STATIC } from './constants'
import { postsCache } from './cache'
import { Post } from '@/types'

export default async function getPostBySlug(slug: string): Promise<Post> {
  const cachedPost = postsCache.get<Post>(slug)
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
  const readingMinutes = readingTime(code).minutes

  if (!title || !date || !summary) {
    throw new Error(`post[${slug}] is missing metadata`)
  }

  const post: Post = {
    mdxCode: code,
    metadata: {
      slug: slug,
      title: title,
      date: new Date(date),
      summary: summary,
      thumbnail: thumbnail || '',
      readingMinutes: readingMinutes,
      tags: tags || [],
      draft: draft || false,
    },
  }

  postsCache.set(slug, post)
  return post
}
