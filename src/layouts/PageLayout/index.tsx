import { PropsWithChildren } from 'react'

export type PageLayoutProps = PropsWithChildren & {
  title: string
  subtitle?: string
  hLayout?: boolean
}

export default function PageLayout({ title, subtitle, children, hLayout }: PageLayoutProps) {
  const containerCls = [
    'flex flex-col divide-y',
    'divide-gray-200 dark:divide-gray-700',
    hLayout
      ? 'md:flex-row md:divide-y-0 md:space-x-6 md:justify-center md:items-center md:mt-24 md:gap-x-4'
      : '',
  ]
    .join(' ')
    .trim()

  const titleContainerCls = ['pb-3 space-y-1', hLayout ? 'md:border-r-2 md:pr-8 md:pb-0' : '']
    .join(' ')
    .trim()

  const titleCls = [
    'text-4xl md:text-5xl',
    'leading-9 sm:leading-10 md:leading-14',
    'font-extrabold tracking-tight',
    'text-gray-900 dark:text-gray-100',
  ]
    .join(' ')
    .trim()

  const subtitleCls = ['text-lg leading-7', 'text-gray-500 dark:text-gray-400'].join(' ').trim()

  const childrenContainerCls = ['pt-4', hLayout ? 'md:pt-0' : ''].join(' ').trim()

  return (
    <div className={containerCls}>
      <div className={titleContainerCls}>
        <h1 className={titleCls}>{title}</h1>
        <p className={subtitleCls}>{subtitle}</p>
      </div>
      <div className={childrenContainerCls}>{children}</div>
    </div>
  )
}
