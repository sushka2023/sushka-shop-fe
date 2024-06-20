export const sectionBg = {
  backgroundColor: 'pink.darker'
  // position: 'relative'
  // border: '1px solid black'

  // lg: {
  //   marginTop: 'clamp(25rem, 4.911rem + 22.32vw, 40.625rem)'
  // }
}

// export const border = {
//   backgroundImage: 'url(/src/icons/borderslider.svg)',
//   position: 'absolute',
//   top: '-110px',
//   height: 'auto',
//   zIndex: '-1',
//   backgroundRepeat: 'repeat',
//   width: 'clamp(20rem, 100vw, 90rem)',
//   backgroundSize: 'cover'
// }

// export const border = {
//   width: '100%',
//   position: 'absolute',
//   top: 'clamp(-9.375rem, -10vw, -1.75rem)',
//   left: '0px',

//   lg: {
//     top: 'clamp(-16.875rem, -10vw, -9.375rem)'
//   }
// }

export const border = {
  position: 'relative',
  top: '2px',
  backgroundImage: 'url(/src/icons/borderslider.svg)',
  width: '100%',
  height: 'clamp(1.25rem, -0.804rem + 10.27vw, 8.438rem)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  marginTop: '254px'
}

export const borderSecond = {
  position: 'relative',
  bottom: '2px',
  backgroundImage: 'url(/src/icons/bordersecondslider.svg)',
  width: '100%',
  height: 'clamp(1.25rem, -0.804rem + 10.27vw, 8.438rem)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  marginBottom: '200px'
}

// export const borderSecond = {
//   backgroundImage: 'url(/src/icons/bordersecondslider.svg)',
//   position: 'absolute',
//   height: '135px',
//   zIndex: '-1',
//   width: '100%',
//   backgroundSize: 'cover',
//   backgroundRepeat: 'repeat-x'
// }

// export const sliderContainer = {
//   lg: {
//     '& > div': {
//       'border': '1px solid red',
//       'position': 'relative',
//       'maxWidth': '1360px',
//       'margin': '0 auto',
//       'padding': '72px 40px',
//       'display': 'flex',
//       'alignItems': 'center',
//       'gap': '20px',
//       '&::before': {
//         display: 'none' // Або будь-який інший стиль, який вам потрібен
//       }
//     }
//   },
//   sm: {
//     '& > div': {
//       padding: '0px'
//     }
//   }
// }

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
  mb: '20px',

  sm: {
    // border: '1px solid green'
    // minHeight: 'clamp(13.5rem, 7.5rem + 30vw, 18.75rem)'
  }
}

export const slideImage = {
  // border: '1px solid green',
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
  height: '595px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
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

// export const ArrowStyle = {
//   lg: {
//     'position': 'absolute',
//     'top': '50%',
//     'width': '40px',
//     'height': '40px',
//     'background': 'none',
//     'display': 'flex',
//     'justifyContent': 'flex-end',
//     'alignItems': 'center',
//     'mb': '40px',
//     '&:hover': {
//       cursor: 'pointer'
//     }
//   },
//   sm: {
//     display: 'none'
//   }
// }

// export const ArrowStylePrev = {
//   left: '5px'
// }

// export const ArrowStyleNext = {
//   right: '10px'
// }

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
