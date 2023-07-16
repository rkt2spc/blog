import 'server-only'
import NodeCache from 'node-cache'

export const cache = new NodeCache({
  stdTTL: 1800,
  checkperiod: 600,
  useClones: false,
  maxKeys: -1,
})
