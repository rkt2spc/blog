import ButtonProps from './props'
import ButtonBase from './Base'

export default function ButtonDanger({ className = '', children }: ButtonProps) {
  const cls = [
    'focus:shadow-outline-blue',
    'bg-red-600 hover:bg-red-700 dark:hover:bg-red-500',
    'text-white',
    className,
  ]
    .join(' ')
    .trim()

  return <ButtonBase className={cls}>{children}</ButtonBase>
}
