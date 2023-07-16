'use client'

import { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import twemoji from 'twemoji'

const U200D = String.fromCharCode(0x200d)
const UFE0Fg = /\uFE0F/g

type EmojiProps = {
  emoji: string
  className?: string
}

function Twemoji({ emoji, className = '' }: EmojiProps) {
  const ext = 'svg'
  const srcBase = `https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/${ext}`

  const [hasError, setHasError] = useState(false)

  useEffect(() => setHasError(false), [emoji])

  const HEXCodePoint = twemoji.convert.toCodePoint(
    emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji
  )

  if (hasError) {
    return <span>{emoji}</span>
  }

  const cls = ['relative', 'text-transparent', className].join(' ').trim()

  return (
    <span className={cls}>
      {emoji}
      <Image
        alt={emoji}
        src={`${srcBase}/${HEXCodePoint}.${ext}`}
        onError={() => setHasError(true)}
        fill
        draggable={false}
      />
    </span>
  )
}

export default memo(Twemoji)
