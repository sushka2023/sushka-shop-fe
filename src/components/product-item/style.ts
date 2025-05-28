export const styles = {
  root: { maxWidth: 400 },
  cardWrapper: {
    maxWidth: '100%',
    height: {
      xs: 500,
      sm: 500,
      md: 550
    },
    boxSizing: 'border-box',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    mb: '20px'
  },
  imageContainer: {
    'position': 'relative',
    'display': 'block',
    'margin': '0 auto',
    'flexGrow': 1,

    '& img': {
      paddingTop: 'clamp(1.25rem, -2.5rem + 7.81vw, 2.5rem)',
      height: 'auto'
    }
  },
  buttonContainer: {
    maxWidth: '100%',
    height: '100%',
    borderRadius: '10px'
  }
}
