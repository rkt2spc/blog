import { ComponentPropsWithoutRef } from 'react'

import ButtonBase from './Base'

export default function ButtonInfo({ className, ...rest }: ComponentPropsWithoutRef<'button'>) {
  const cls = [
    'shadow focus:shadow-outline-blue',
    'bg-sky-400 hover:bg-sky-500 dark:hover:bg-sky-300',
    'text-white',
    className || '',
  ]
    .join(' ')
    .trim()

  return <ButtonBase className={cls} {...rest} />
}
