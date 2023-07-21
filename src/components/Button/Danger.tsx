import { ComponentPropsWithoutRef } from 'react'

import ButtonBase from './Base'

export default function ButtonDanger({ className, ...rest }: ComponentPropsWithoutRef<'button'>) {
  const cls = [
    'shadow focus:shadow-outline-red',
    'bg-red-500 hover:bg-red-600 dark:hover:bg-red-400',
    'text-white',
    className || '',
  ]
    .join(' ')
    .trim()

  return <ButtonBase className={cls} {...rest} />
}
