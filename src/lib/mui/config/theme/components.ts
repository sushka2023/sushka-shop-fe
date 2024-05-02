import { ThemeOptions } from '@mui/material'
import { MuiButton } from '../overrides/button'

const COMPONENTS: Pick<ThemeOptions, 'components'> = {
  components: {
    MuiButton: {
      ...MuiButton
    }
  }
}

export { COMPONENTS }
