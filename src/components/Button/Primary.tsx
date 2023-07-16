import ButtonProps from './props'
import ButtonBase from './Base'

export default function ButtonPrimary({ className = '', children }: ButtonProps) {
  const cls = [
    'focus:shadow-outline-blue',
    'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500',
    'text-white',
    className,
  ]
    .join(' ')
    .trim()

  return <ButtonBase className={cls}>{children}</ButtonBase>
}
