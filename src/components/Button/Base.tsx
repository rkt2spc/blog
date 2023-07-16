import ButtonProps from './props'

export default function ButtonBase({ className = '', children }: ButtonProps) {
  const cls = [
    'rounded-lg',
    'border border-transparent',
    'shadow',
    'px-4 py-2',
    'transition-colors duration-150',
    className,
  ]
    .join(' ')
    .trim()

  return <button className={cls}>{children}</button>
}
