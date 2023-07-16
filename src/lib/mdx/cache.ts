import 'server-only'
import NodeCache from 'node-cache'

export const blogsCache = new NodeCache({
  stdTTL: 1800,
  checkperiod: 600,
  useClones: false,
  maxKeys: -1,
})

export const metaCache = new NodeCache({
  stdTTL: 1800,
  checkperiod: 600,
  useClones: false,
  maxKeys: -1,
})
