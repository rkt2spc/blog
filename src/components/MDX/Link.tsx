import { ComponentPropsWithoutRef } from 'react'

import CustomLink from '@/components/Link'

export default function Link(props: ComponentPropsWithoutRef<'a'>) {
  return <CustomLink {...props} />
}
