export const sectionBg = {
  backgroundColor: 'pink.darker'
}

export const sliderTitle = {
  color: 'background.default',
  mb: '40px',

  xl: {
    fontSize: '48px'
  },
  md: {
    fontSize: 'clamp(1.063rem, -0.321rem + 3.69vw, 3rem)'
  },
  sm: { fontSize: '17px' }
}

export const slideElement = {
  maxWidth: '100%',
  boxSizing: 'border-box',
  borderRadius: '10px',
  backgroundColor: 'background.default',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  mb: '20px'
}

export const slideImage = {
  position: 'relative',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
  flexGrow: 1,

  img: {
    // border: '1px solid red',
    paddingTop: 'clamp(1.25rem, -2.5rem + 7.81vw, 2.5rem)'
  }
}

export const slideInfo = {
  // border: '2px solid blue',
  color: 'secondary.darker',
  flexGrow: 1,
  // textAlign: 'center',
  fontSize: '22px',
  fontWeight: 600,
  padding: '20px 30px 20px 30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  md: {
    padding: '10px 15px'
  }
}

export const lastSlider = {
  // maxWidth: '168px',
  // height: '595px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute'
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)'
}

export const cardFavorite = {
  lg: {
    'position': 'absolute',
    'top': '32px',
    'right': '32px',
    'color': 'error.dark',
    '&:hover': {
      color: 'primary.darker',
      cursor: 'pointer'
    }
  },
  sm: {
    top: '15px',
    right: '15px',
    fontSize: '1rem'
  }
}

export const cardHeader = {
  marginBottom: '18px',
  color: 'secondary.darker'
}

export const cardPararaph = {
  maxWidth: '320px',
  color: 'secondary.darker',
  fontSize: ' 18px',
  margin: '7px 0 40px 0',

  sm: {
    display: 'none'
  }
}

export const cardBold = {
  color: 'secondary.darker',
  fontSize: 'clamp(0.813rem, 0.017rem + 2.12vw, 1.375rem)',
  fontWeight: '600',

  sm: {
    fontWeight: '400'
  }
}

export const customButton = {
  'color': 'secondary.darker',
  'backgroundColor': 'background.default',
  'border': 'none',
  '&:hover': {
    color: 'secondary.darker', // Замість цього використайте бажаний колір для hover
    border: '2px solid', // Замість цього використайте бажаний колір та стиль для hover
    borderColor: 'secondary.darker'
  }
}

export const sliderButton = {
  width: '100%',
  fontSize: 'clamp(0.875rem, 0.777rem + 0.35vw, 1rem)',
  padding:
    'clamp(0.25rem, -0.24rem + 1.74vw, 0.875rem) clamp(0.5rem, -0.48rem + 3.48vw, 1.75rem)'
}
