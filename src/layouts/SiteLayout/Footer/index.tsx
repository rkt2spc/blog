import Link from '@/components/Link'

import NextIcon from './next.svg'
import TailwindIcon from './tailwind.svg'
import TypeScriptIcon from './typescript.svg'
import UmamiIcon from './umami.svg'

import Container from '@/components/Container'

export default function Footer() {
  const sourceURL = 'https://github.com/rkt2spc/blog'
  const author = 'Tuan M Nguyen'
  const ref = 'rkt2spc'

  return (
    <footer>
      <Container className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 justify-between items-center text-sm mt-16 mb-10">
        <div className="col-span-1 justify-self-center sm:justify-self-start space-x-1.5">
          <span className="text-gray-500 dark:text-gray-400">Built with</span>
          <a target="_blank" href={`https://nextjs.org/?ref=${ref}`}>
            <NextIcon className="h-5 w-5 inline" />
          </a>
          <a target="_blank" href={`https://tailwindcss.com/?ref=${ref}`}>
            <TailwindIcon className="h-5 w-5 inline" />
          </a>
          <a target="_blank" href={`https://www.typescriptlang.org/?ref=${ref}`}>
            <TypeScriptIcon className="h-5 w-5 inline" />
          </a>
          <a target="_blank" href={`https://umami.is/?ref=${ref}`}>
            <UmamiIcon className="h-5 w-5 inline" />
          </a>
          <span className="mx-1 text-gray-500 dark:text-gray-400">-</span>
          <Link
            className="underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href={sourceURL}
          >
            View Source
          </Link>
        </div>
        <div className="col-span-1 justify-self-center sm:justify-self-end space-x-1.5 text-gray-500 dark:text-gray-400">
          Copyright © 2023 <span className="text-black dark:text-white">{author}</span>
        </div>
      </Container>
    </footer>
  )
}
