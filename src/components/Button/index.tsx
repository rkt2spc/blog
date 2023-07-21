import { ComponentPropsWithoutRef } from 'react'

import ButtonBase from './Base'
import ButtonPrimary from './Primary'
import ButtonDanger from './Danger'
import ButtonInfo from './Info'

type ButtonPropsWithVariant = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'info' | 'danger'
}

export default function Button({ variant, ...rest }: ButtonPropsWithVariant) {
  switch (variant) {
    case 'primary':
      return <ButtonPrimary {...rest} />
    case 'danger':
      return <ButtonDanger {...rest} />
    case 'info':
      return <ButtonInfo {...rest} />
    default:
      return <ButtonBase {...rest} />
  }
}
