import { PropsWithChildren } from 'react'

export type ContainerProps = PropsWithChildren & {
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  const cls = ['mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0', className].join(' ').trim()

  return <div className={cls}>{children}</div>
}
