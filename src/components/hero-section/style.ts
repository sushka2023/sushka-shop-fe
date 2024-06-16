export const mainBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 'clamp(0.625rem, -1.384rem + 5.36vw, 3.438rem)',
  paddingTop: '0',
  marginTop: '50px',
  lg: {
    justifyContent: 'center',
    padding: '0 clamp(0.75rem, 0.214rem + 1.43vw, 1.5rem)'
  },
  sm: {
    flexDirection: 'column'
  }
}

export const slogan = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 'clamp(0.938rem, -0.179rem + 2.98vw, 2.5rem)'
}

export const sloganTitle = {
  md: {
    fontSize: 'clamp(1.625rem, 0.464rem + 3.1vw, 3.25rem)'
  },
  sm: { fontSize: '26px' }
}

export const sloganButton = {
  width: 'clamp(12.5rem, 7.6rem + 17.42vw, 18.75rem)',
  fontSize: 'clamp(0.875rem, 0.777rem + 0.35vw, 1rem)',
  padding:
    'clamp(0.25rem, -0.24rem + 1.74vw, 0.875rem) clamp(0.5rem, -0.48rem + 3.48vw, 1.75rem)'
}

export const sloganParagraph = {
  color: 'secondary.darker',
  fontSize: 'clamp(0.813rem, 0.589rem + 0.6vw, 1.125rem)'
}

export const sloganImgLogo = {
  lg: {
    width: '100%',
    maxWidth: 'clamp(28.75rem, -17.404rem + 72.12vw, 47.5rem)',
    height: 'auto'
  },
  md: {
    width: 'clamp(18.75rem, 4.599rem + 37.74vw, 28.75rem)',
    minHeight: '315px'
  },
  sm: {
    width: '100%',
    position: 'absolute',
    left: '0px',
    overflow: 'hidden',
    mt: '40px'
  }
}
