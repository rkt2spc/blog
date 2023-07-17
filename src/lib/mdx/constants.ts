import path from 'path'

export const DIRECTORY_ROOT = process.cwd()
export const DIRECTORY_DATA = path.join(DIRECTORY_ROOT, 'src/data')
export const DIRECTORY_DATA_POSTS = path.join(DIRECTORY_DATA, 'posts')

export const DIRECTORY_PUBLIC = path.join(DIRECTORY_ROOT, 'public')
export const DIRECTORY_PUBLIC_STATIC = path.join(DIRECTORY_PUBLIC, 'static')

export const CACHE_KEY_AUTHOR = 'author'
export const CACHE_KEY_POSTS = 'posts'
export const CACHE_KEY_SLUGS = 'slugs'
export const CACHE_KEY_TAGS = 'tags'
export const CACHE_KEY_METADATA = 'metadata'
export const CACHE_KEY_COUNT = 'count'
