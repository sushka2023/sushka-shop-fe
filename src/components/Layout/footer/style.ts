export const borderTopStyle = {
  backgroundColor: 'turquoise.darker',
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
  'gridTemplateColumns': 'repeat(4, 1fr)', // Чотири колонки для великих екранів
  'gap': '15px',
  'gridTemplateAreas': `
    "block1 block2 block3 block4"
  `, // Розташування блоків на великих екранах
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1.5fr 0.5fr', // Дві колонки на маленьких екранах
    gridTemplateAreas: `
      "block1 block1"
      "block2 block4"
      "block3 block3"
    ` // Сітка для маленьких екранів
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
