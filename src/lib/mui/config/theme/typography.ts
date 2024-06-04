import {
  COMFORTAA_MEDIUM,
  NUNITO_EXTRA_BOLD,
  NUNITO_MEDIUM,
  OPEN_SANS_SEMI_BOLD,
  OPEN_SANS_LIGHT,
  OPEN_SANS_REGULAR,
  OPEN_SANS_BOLD
} from '../fonts'

const THEME_TYPOGRAPHY = {
  body1: {
    fontFamily: OPEN_SANS_REGULAR.font,
    fontSize: '1rem',
    fontWeigh: OPEN_SANS_REGULAR.weight,
    lineHeight: 'normal'
  },
  body2: {
    fontFamily: OPEN_SANS_LIGHT.font,
    fontSize: '1rem',
    fontWeight: OPEN_SANS_LIGHT.weight,
    lineHeight: 'normal'
  },
  caption: {
    fontFamily: OPEN_SANS_LIGHT.font,
    fontSize: '1rem',
    fontWeight: OPEN_SANS_LIGHT.weight,
    lineHeight: 'normal'
  },
  fontFamily: OPEN_SANS_REGULAR.font,
  fontWeight: OPEN_SANS_REGULAR.weight,
  h1: {
    fontFamily: NUNITO_EXTRA_BOLD.font,
    fontSize: 'clamp(1.5rem, 1rem + 2.5vw, 3.25rem)',
    fontWeight: NUNITO_EXTRA_BOLD.weight,
    lineHeight: 'normal'
  },
  h2: {
    fontFamily: NUNITO_MEDIUM.font,
    fontSize: '3rem',
    fontWeight: NUNITO_MEDIUM.weight,
    lineHeight: 'normal'
  },
  h3: {
    fontFamily: COMFORTAA_MEDIUM.font,
    fontSize: '2rem',
    fontWeight: COMFORTAA_MEDIUM.weight,
    lineHeight: 'normal'
  },
  h4: {
    fontFamily: OPEN_SANS_SEMI_BOLD.font,
    fontSize: '1.375rem',
    fontWeight: OPEN_SANS_SEMI_BOLD.weight,
    lineHeight: 'normal'
  },
  h5: {
    fontFamily: OPEN_SANS_LIGHT.font,
    fontSize: '1.125rem',
    fontWeight: OPEN_SANS_LIGHT.weight,
    lineHeight: 'normal'
  },
  h6: {
    fontFamily: OPEN_SANS_REGULAR.font,
    fontSize: '1rem',
    fontWeigh: OPEN_SANS_REGULAR.weight,
    lineHeight: 'normal'
  },
  subtitle1: {
    fontFamily: OPEN_SANS_BOLD.font,
    fontSize: '0.875rem',
    fontWeigh: OPEN_SANS_BOLD.weight,
    lineHeight: 'normal'
  },
  subtitle2: {
    fontFamily: OPEN_SANS_REGULAR.font,
    fontSize: '0.875rem',
    fontWeigh: OPEN_SANS_REGULAR.weight,
    lineHeight: 'normal'
  }
} as const

export { THEME_TYPOGRAPHY }
