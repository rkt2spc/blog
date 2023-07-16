import { MDXComponents } from 'mdx/types'
import Image from './Image'
import Link from './Link'
import Pre from './Pre'

export const Components: MDXComponents = {
  a: Link,
  pre: Pre,
  img: Image,
}
