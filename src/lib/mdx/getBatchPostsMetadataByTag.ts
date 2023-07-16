import 'server-only'

import { PostMetadata, Batch } from '@/types'

import getPostsMetadataByTag from './getPostsMetadataByTag'

export default async function getBatchPostsMetadataByTag(
  batch: Batch,
  tag: string
): Promise<PostMetadata[]> {
  const { offset, limit } = batch

  const allMetadata = await getPostsMetadataByTag(tag)
  return allMetadata.slice(offset, offset + limit)
}
