import { ComponentPropsWithoutRef } from 'react'

export default function ButtonBase({ className, ...rest }: ComponentPropsWithoutRef<'button'>) {
  const cls = [
    'rounded-lg',
    'border border-transparent',
    'px-4 py-2',
    'transition-colors duration-150',
    className || '',
  ]
    .join(' ')
    .trim()

  return <button className={cls} {...rest} />
}
