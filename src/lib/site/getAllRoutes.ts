import 'server-only'

import path from 'path'
import { glob } from 'glob'

import { uniq } from '@/lib/util'
import { getAllPostsSlug, getAllPostsTag } from '@/lib/mdx'

const ROOT_DIRECTORY = process.cwd()
const APP_DIRECTORY = path.join(ROOT_DIRECTORY, '/src/app')

async function getFixedRoutes(): Promise<string[]> {
  const pageExtensions = ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts']
  const paths = await glob(path.join(APP_DIRECTORY, `/**/page.{${pageExtensions.join(',')}}`))
  const routes = paths
    .filter((p) => !(p.includes('[') || p.includes(']'))) // Filter out parameterized routes
    .map((p) => p.slice(APP_DIRECTORY.length)) // Trim directory prefix
    .map((p) => p.replace(/\/page\.[a-z]+$/, ''))

  return routes
}

async function getBlogRoutes(): Promise<string[]> {
  const slugs = await getAllPostsSlug()
  const routes = slugs.map((slug) => `/blog/${slug}`)
  return routes
}

async function getTagRoutes(): Promise<string[]> {
  const tags = await getAllPostsTag()
  const routes = Object.keys(tags).map((tag) => `/tags/${tag}`)
  return routes
}

export default async function getAllRoutes(): Promise<string[]> {
  const fixedRoutes = await getFixedRoutes()
  const blogRoutes = await getBlogRoutes()
  const tagRoutes = await getTagRoutes()

  return uniq([...fixedRoutes, ...blogRoutes, ...tagRoutes]).sort()
}
