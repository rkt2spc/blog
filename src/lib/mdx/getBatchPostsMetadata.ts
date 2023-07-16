import 'server-only'

import { PostMetadata, Batch } from '@/types'

import getAllPostsMetadata from './getAllPostsMetadata'

export default async function getBatchPostsMetadata(batch: Batch): Promise<PostMetadata[]> {
  const { offset, limit } = batch

  const allMetadata = await getAllPostsMetadata()
  return allMetadata.slice(offset, offset + limit)
}
