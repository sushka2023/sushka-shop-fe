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
  '& > div': {
    maxWidth: '1360px',
    margin: '0 auto',
    padding: '72px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  }
}

export const slideElement = {
  maxWidth: '400px',
  boxSizing: 'border-box'
}

export const slideImage = {
  position: 'relative',
  padding: '40px 20px 32px',
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  margin: '0 auto'
}

export const lastSlider = {
  maxWidth: '400px',
  height: '595px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const cardFavorite = {
  'position': 'absolute',
  'top': '40px',
  'right': '34px',
  'fill': 'turquoise.darker',
  '&:hover': {
    background: 'pink.darker',
    cursor: 'pointer'
  }
}

export const cardHeader = {
  marginBottom: '18px',
  color: 'secondary.darker',
  fontFamily: 'fontFamily',
  fontSize: '22px',
  fontWeight: 'fontWeight',
  lineHeight: '120%'
}
