import _ from 'lodash'

export default function deepMerge<T>(target: T, source: T): T {
  return _.merge(target, source)
}
