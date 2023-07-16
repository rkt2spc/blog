import Link from '@/components/Link'

import Emoji from '@/components/Emoji'
import Button from '@/components/Button'
import NotFoundImage from './404.svg'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 md:pt-10 xl:pt-20">
      <NotFoundImage className="w-11/12 sm:8/12 md:w-6/12 -my-4 text-primary-600 dark:text-secondary-400" />
      <div className="text-center">
        <p className="mb-6 text-xl font-bold leading-normal md:text-2xl">
          {`Hmm.. it seems that you're lost`}
          <Emoji className="ms-2" emoji="🧐" />
        </p>
        <Link href="/">
          <Button variant="primary" className="text-sm font-medium">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
