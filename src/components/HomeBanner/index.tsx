'use client'

import Emoji from '@/components/Emoji'

export type HomeBannerProps = {
  title: string
  titleEmoji?: string
  message: string
}

export default function HomeBanner({ title, titleEmoji, message }: HomeBannerProps) {
  const gradientTxtCls = [
    'bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600',
    'dark:from-secondary-600 dark:via-secondary-500 dark:to-secondary-600',
    'bg-clip-text font-bold text-transparent',
  ]
    .join(' ')
    .trim()
  const titleCls = 'text-4xl md:text-5xl py-1'
  const messageCls = 'mt-2 first:mt-4 leading-snug text-lg text-gray-600 dark:text-gray-300'

  return (
    <div>
      <h1 className={titleCls}>
        <span className={gradientTxtCls}>{title}</span>
        {titleEmoji && <Emoji className="ms-2" emoji={titleEmoji} />}
      </h1>
      <div>
        {message.split('\n').map((lineTxt, idx) => (
          <p key={idx} className={messageCls}>
            {lineTxt}
          </p>
        ))}
      </div>
    </div>
  )
}
