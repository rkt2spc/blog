import 'server-only'

import fs from 'fs'
import path from 'path'

import { bundleMDX } from 'mdx-bundler'

import remarkGfm from 'remark-gfm'
import remarkCodeTitles from './plugins/remark-code-titles'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkMdxImages from 'remark-mdx-images'

import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'

import { Author } from '@/types'

import { CACHE_KEY_AUTHOR } from './constants'
import { cache } from './caches'
import { DIRECTORY_ROOT, DIRECTORY_DATA, DIRECTORY_PUBLIC_STATIC } from './constants'

export default async function getPostBySlug(): Promise<Author> {
  const cachedPost = cache.get<Author>(CACHE_KEY_AUTHOR)
  if (cachedPost) {
    return cachedPost
  }

  const authorModule = 'author'

  const mdxSourcePath = [
    path.join(DIRECTORY_DATA, `${authorModule}.mdx`),
    path.join(DIRECTORY_DATA, `${authorModule}.md`),
    path.join(DIRECTORY_DATA, `${authorModule}/index.mdx`),
    path.join(DIRECTORY_DATA, `${authorModule}/index.md`),
  ].find(fs.existsSync)

  const mdxSource = mdxSourcePath ? fs.readFileSync(mdxSourcePath, 'utf8') : ''

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(DIRECTORY_ROOT, 'node_modules/esbuild/esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(DIRECTORY_ROOT, 'node_modules/esbuild/bin/esbuild')
  }

  const cwd = mdxSourcePath ? path.dirname(mdxSourcePath) : DIRECTORY_DATA

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
      options.outdir = path.join(DIRECTORY_PUBLIC_STATIC, authorModule)
      options.loader = {
        ...options.loader,
        '.svg': 'dataurl',
        '.png': 'file',
        '.jpg': 'file',
        '.webp': 'file',
        '.gif': 'file',
      }
      options.publicPath = path.join(
        process.env.NEXT_PUBLIC_BASE_PATH || '/',
        'static',
        authorModule
      )
      options.write = true

      return options
    },
  })

  const { name, avatar, occupation, company, socials } = frontmatter

  if (!name || !avatar || !occupation) {
    throw new Error(`author is missing metadata`)
  }

  const author: Author = {
    mdxCode: code,
    metadata: {
      name: name,
      avatar: avatar,
      occupation: occupation,
      company: company,
      socials: socials || [],
    },
  }

  cache.set(CACHE_KEY_AUTHOR, author)
  return author
}
