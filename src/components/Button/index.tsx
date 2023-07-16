import ButtonProps from './props'
import ButtonBase from './Base'
import ButtonPrimary from './Primary'
import ButtonDanger from './Danger'

type ButtonPropsWithVariant = ButtonProps & {
  variant: 'primary' | 'danger'
}

export default function Button({ variant, ...rest }: ButtonPropsWithVariant) {
  switch (variant) {
    case 'primary':
      return <ButtonPrimary {...rest} />
    case 'danger':
      return <ButtonDanger {...rest} />
    default:
      return <ButtonBase {...rest} />
  }
}
