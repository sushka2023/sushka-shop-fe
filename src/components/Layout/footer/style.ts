export const borderTopStyle = {
  position: 'relative',
  top: '0px',
  width: '100%',
  height: 'clamp(1.25rem, -0.804rem + 10.27vw, 8.438rem)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundImage: 'url(/src/icons/border.svg)',
  svg: {
    width: 'clamp(9.375rem, 6.696rem + 13.39vw, 18.75rem)',
    height: '210px',
    position: 'absolute',
    top: '-80px',
    right: '10px',
    transform: 'rotate(355deg)'
  }
}

export const footerWrapperStyle = {
  'display': 'grid',
  'gridTemplateColumns': 'repeat(4, 1fr)',
  'gap': '20px',
  'gridTemplateAreas': `
    "block1 block2 block3 block4"
  `,
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1.5fr 0.5fr',
    gridTemplateAreas: `
      "block1 block1"
      "block2 block4"
      "block3 block3"
    `
  }
}

export const footerBorderStyle = {
  marginTop: '44px',
  marginBottom: '23px',
  height: '1px',
  backgroundColor: 'primary.darker'
}

export const footerLegalBlockStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}
