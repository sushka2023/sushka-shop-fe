export const sectionBg = {
  marginTop: '254px',
  marginBottom: '200px',
  backgroundColor: 'pink.darker',
  position: 'relative'
}

export const border = {
  backgroundImage: 'url(/src/icons/borderslider.svg)',
  position: 'absolute',
  top: '-110px',
  height: '154px',
  zIndex: '-1',
  backgroundRepeat: 'repeat',
  width: '100%',
  backgroundSize: 'cover'
}

export const borderSecond = {
  backgroundImage: 'url(/src/icons/bordersecondslider.svg)',
  position: 'absolute',
  height: '135px',
  zIndex: '-1',
  width: '100%',
  backgroundSize: 'cover',
  backgroundRepeat: 'repeat-x'
}

export const sliderContainer = {
  lg: {
    '& > div': {
      'border': '1px solid red',
      'position': 'relative',
      'maxWidth': '1360px',
      'margin': '0 auto',
      'padding': '72px 40px',
      'display': 'flex',
      'alignItems': 'center',
      'gap': '20px',
      '&::before': {
        display: 'none' // Або будь-який інший стиль, який вам потрібен
      }
    }
  },
  sm: {
    '& > div': {
      padding: '0px'
    }
  }
}

export const sliderTitle = {
  color: 'background.default',
  mb: '16px',

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
  mb: '20px',
  // mr: '10px',
  // border: '1px solid red',
  display: 'flex',
  flexDirection: 'column',
  // height: '100vh', // Задайте висоту контейнера, якщо необхідно

  sm: {
    border: '1px solid green',
    minHeight: 'clamp(13.5rem, 7.5rem + 30vw, 18.75rem)'
  }
}

export const slideImage = {
  position: 'relative',
  // maxWidth: '100%',
  height: 'auto',
  // height: '112px',
  display: 'block',
  // padding: '40px 20px 0px 20px',
  margin: '0 auto',
  flexGrow: 1
  // border: '1px solid red'
}

export const slideInfo = {
  // border: '2px solid blue',
  color: 'secondary.darker',
  flexGrow: 1,
  textAlign: 'center',
  fontSize: '22px',
  fontWeight: 600,
  padding: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

export const lastSlider = {
  maxWidth: '168px',
  height: '595px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const cardFavorite = {
  'position': 'absolute',
  'top': '15px',
  'right': '15px',
  'color': 'secondary.darker',
  '&:hover': {
    color: 'primary.darker',
    cursor: 'pointer'
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
  margin: '7px 0 70px 0'
}

export const cardBold = {
  color: 'secondary.darker',
  fontSize: '22px',
  fontWeight: '600',

  sm: {
    fontSize: '13px'
  }
}

export const ArrowStyle = {
  lg: {
    'position': 'absolute',
    'width': '40px',
    'height': '40px',
    'background': 'none',
    'display': 'flex',
    'justifyContent': 'flex-end',
    'alignItems': 'center',
    'mb': '40px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  sm: {
    display: 'none'
  }
}

export const ArrowStylePrev = {
  top: '50%',
  left: '10px'
}

export const ArrowStyleNext = {
  top: '50%',
  right: '10px'
}

export const customButton = {
  'color': 'secondary.darker',
  'backgroundColor': 'background.default',
  'border': 'none',
  '&:hover': {
    color: 'secondary.darker', // Замість цього використайте бажаний колір для hover
    border: '2px solid #567343' // Замість цього використайте бажаний колір та стиль для hover
  }
}

export const sliderButton = {
  width: '100%',
  fontSize: 'clamp(0.875rem, 0.777rem + 0.35vw, 1rem)',
  padding:
    'clamp(0.25rem, -0.24rem + 1.74vw, 0.875rem) clamp(0.5rem, -0.48rem + 3.48vw, 1.75rem)'
}
