import { createTheme } from '@mui/material'
import { PALETTE_CORE } from './pallete'
import { THEME_TYPOGRAPHY } from './typography'
import { COMPONENTS } from './components'
import { BREAKPOINTS } from './breakpoints'
import { PaletteColorOptions } from '@mui/material'

const THEME = createTheme({
  ...COMPONENTS,
  ...BREAKPOINTS,
  palette: {
    ...PALETTE_CORE
  },
  typography: THEME_TYPOGRAPHY
})

declare module '@mui/material/styles' {
  interface PaletteOptions {
    turquoise?: PaletteColorOptions
    peach?: PaletteColorOptions
    pink?: PaletteColorOptions
    black?: PaletteColorOptions
    accent?: PaletteColorOptions
    sapphire?: PaletteColorOptions
    illustrations?: PaletteColorOptions
  }

  interface SimplePaletteColorOptions {
    darker?: string
    lighter?: string
  }

  interface PaletteColor {
    darker?: string
    lighter?: string
  }
}

export { THEME }
