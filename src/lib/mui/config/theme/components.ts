import { ThemeOptions } from '@mui/material'
import { MuiButton } from '../overrides/button'
import { MuiOutlinedInput } from '../overrides/input'
import { MuiInputLabel } from '../overrides/label'

const COMPONENTS: Pick<ThemeOptions, 'components'> = {
  components: {
    MuiButton: MuiButton,
    MuiOutlinedInput: MuiOutlinedInput,
    MuiInputLabel: MuiInputLabel
  }
}

export { COMPONENTS }
