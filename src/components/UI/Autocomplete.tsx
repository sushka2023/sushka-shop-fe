import {
  Autocomplete as AutocompleteMui,
  AutocompleteProps
} from '@mui/material'
import { FC } from 'react'

const Autocomplete: FC<AutocompleteProps<any, boolean, boolean, boolean>> = ({
  ...props
}) => {
  return <AutocompleteMui {...props} />
}

export { Autocomplete }
