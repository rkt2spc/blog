import { PropsWithChildren } from 'react'

export type PageLayoutProps = PropsWithChildren & {
  title: string
  subtitle?: string
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  const titleCls = [
    'text-4xl md:text-5xl',
    'leading-9 sm:leading-10 md:leading-14',
    'font-extrabold tracking-tight',
    'text-gray-900 dark:text-gray-100',
  ]
    .join(' ')
    .trim()

  const subtitleCls = ['text-lg leading-7', 'text-gray-500 dark:text-gray-400'].join(' ').trim()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pb-3 space-y-1">
        <h1 className={titleCls}>{title}</h1>
        <p className={subtitleCls}>{subtitle}</p>
      </div>
      <div className="pt-4">{children}</div>
    </div>
  )
}
