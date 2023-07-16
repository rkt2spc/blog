import path from 'path'

export const DIRECTORY_ROOT = process.cwd()
export const DIRECTORY_DATA_POSTS = path.join(DIRECTORY_ROOT, 'src/data/posts')

export const DIRECTORY_PUBLIC = path.join(DIRECTORY_ROOT, 'public')
export const DIRECTORY_PUBLIC_STATIC = path.join(DIRECTORY_PUBLIC, 'static')

export const CACHE_KEY_META_SLUGS = 'slugs'
