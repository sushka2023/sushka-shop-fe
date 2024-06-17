import { ThemeOptions } from '@mui/material'
import { MuiButton } from '../overrides/button'
import { MuiOutlinedInput } from '../overrides/input'
import { MuiInputLabel } from '../overrides/label'
import { MuiAutocomplete } from '../overrides/autocomplete'
import { MuiRadio } from '../overrides/radio'
import { MuiCheckbox } from '../overrides/checkbox'
import { MuiStepper } from '../overrides/stepper'
import { MuiTabs } from '../overrides/tabs'
import { MuiTab } from '../overrides/tab'
import { MuiContainer } from '../overrides/container'

const COMPONENTS: Pick<ThemeOptions, 'components'> = {
  components: {
    MuiButton,
    MuiOutlinedInput,
    MuiInputLabel,
    MuiAutocomplete,
    MuiRadio,
    MuiCheckbox,
    MuiStepper,
    MuiTabs,
    MuiContainer,
    MuiTab: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true
      },
      ...MuiTab
    }
  }
}

export { COMPONENTS }
