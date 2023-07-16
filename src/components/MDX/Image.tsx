import fs from 'fs'
import path from 'path'

import { ComponentPropsWithoutRef } from 'react'
import NextImage from 'next/image'
import sizeOf from 'image-size'

const externalUrlPattern = /^https?:/

export default function Image(props: ComponentPropsWithoutRef<'img'>) {
  const { src = '', alt = '', width, height, title } = props

  if (width && height) {
    return (
      <NextImage
        className="mx-auto"
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        title={title}
      />
    )
  }

  if (externalUrlPattern.test(src) || width || height) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="mx-auto" src={src} alt={alt} width={width} height={height} title={title} />
    )
  }

  const imageFile = path.normalize(`${process.cwd()}/public/${src}`)
  if (fs.existsSync(imageFile)) {
    const dimensions = sizeOf(imageFile)
    return (
      <NextImage
        className="mx-auto"
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        title={title}
      />
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img className="mx-auto" src={src} alt={alt} width={width} height={height} title={title} />
}
