import { PaletteOptions, PaletteColorOptions } from '@mui/material'
import {
  GREEN_DARKER,
  GREEN_DARK,
  YELLOW_DARK,
  YELLOW_DARKER,
  YELLOW_LIGHT,
  YELLOW_LIGHTER,
  YELLOW_MEDIUM,
  GREEN_MEDIUM,
  GREEN_LIGHT,
  GREEN_LIGHTER,
  RED_DARKER,
  RED_DARK,
  RED_MEDIUM,
  RED_LIGHTER,
  RED_LIGHT,
  GREEN_SUCCESS_DARKER,
  GREEN_SUCCESS_DARK,
  GREEN_SUCCESS_MEDIUM,
  GREEN_SUCCESS_LIGHT,
  GREEN_SUCCESS_LIGHTER,
  BLUE_DARKER,
  BLUE_DARK,
  BLUE_MEDIUM,
  BLUE_LIGHT,
  BLUE_LIGHTER,
  BACKGROUND,
  GRAY_LIGHTER,
  GRAY_LIGHT,
  GRAY_DARKER,
  GRAY_DARK,
  TURQUOISE_DARKER,
  TURQUOISE_DARK,
  TURQUOISE_MEDIUM,
  TURQUOISE_LIGHT,
  TURQUOISE_LIGHTER,
  PINK_DARKER,
  PINK_DARK,
  PINK_MEDIUM,
  PINK_LIGHT,
  PINK_LIGHTER,
  BLACK_DARKER,
  BLACK_DARK,
  BLACK_MEDIUM,
  BLACK_LIGHT,
  BLACK_LIGHTER,
  PURPLE_DARKER,
  PURPLE_DARK,
  PURPLE_MEDIUM,
  PURPLE_LIGHT,
  PURPLE_LIGHTER,
  SAPPHIRINE_DARKER,
  SAPPHIRINE_DARK,
  SAPPHIRINE_MEDIUM,
  SAPPHIRINE_LIGHT,
  SAPPHIRINE_LIGHTER,
  OTHER_RED,
  OTHER_BLUE,
  OTHER_LIGHT_PINK
} from '../colors'

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
}

const PALETTE_CORE: PaletteOptions = {
  background: {
    default: BACKGROUND
  },
  primary: {
    darker: YELLOW_DARKER,
    dark: YELLOW_DARK,
    main: YELLOW_MEDIUM,
    light: YELLOW_LIGHT,
    lighter: YELLOW_LIGHTER
  },
  secondary: {
    darker: GREEN_DARKER,
    dark: GREEN_DARK,
    main: GREEN_MEDIUM,
    light: GREEN_LIGHT,
    lighter: GREEN_LIGHTER
  },
  error: {
    darker: RED_DARKER,
    dark: RED_DARK,
    main: RED_MEDIUM,
    light: RED_LIGHT,
    lighter: RED_LIGHTER
  },
  success: {
    darker: GREEN_SUCCESS_DARKER,
    dark: GREEN_SUCCESS_DARK,
    main: GREEN_SUCCESS_MEDIUM,
    light: GREEN_SUCCESS_LIGHT,
    lighter: GREEN_SUCCESS_LIGHTER
  },
  info: {
    darker: BLUE_DARKER,
    dark: BLUE_DARK,
    main: BLUE_MEDIUM,
    light: BLUE_LIGHT,
    lighter: BLUE_LIGHTER
  },
  grey: {
    50: GRAY_LIGHTER,
    100: GRAY_LIGHT,
    200: GRAY_DARK,
    300: GRAY_DARKER
  },
  turquoise: {
    darker: TURQUOISE_DARKER,
    dark: TURQUOISE_DARK,
    main: TURQUOISE_MEDIUM,
    light: TURQUOISE_LIGHT,
    lighter: TURQUOISE_LIGHTER
  },
  pink: {
    darker: PINK_DARKER,
    dark: PINK_DARK,
    main: PINK_MEDIUM,
    light: PINK_LIGHT,
    lighter: PINK_LIGHTER
  },
  black: {
    darker: BLACK_DARKER,
    dark: BLACK_DARK,
    main: BLACK_MEDIUM,
    light: BLACK_LIGHT,
    lighter: BLACK_LIGHTER
  },
  accent: {
    darker: PURPLE_DARKER,
    dark: PURPLE_DARK,
    main: PURPLE_MEDIUM,
    light: PURPLE_LIGHT,
    lighter: PURPLE_LIGHTER
  },
  sapphire: {
    darker: SAPPHIRINE_DARKER,
    dark: SAPPHIRINE_DARK,
    main: SAPPHIRINE_MEDIUM,
    light: SAPPHIRINE_LIGHT,
    lighter: SAPPHIRINE_LIGHTER
  },
  illustrations: {
    main: OTHER_RED,
    light: OTHER_BLUE,
    lighter: OTHER_LIGHT_PINK
  }
}

export { PALETTE_CORE }
