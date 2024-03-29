import { ComponentPropsWithoutRef } from 'react'

import ButtonBase from './Base'

export default function ButtonPrimary({ className, ...rest }: ComponentPropsWithoutRef<'button'>) {
  const cls = [
    'shadow focus:shadow-outline-blue',
    'bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400',
    'text-white',
    className,
  ]
    .join(' ')
    .trim()

  return <ButtonBase className={cls} {...rest} />
}
