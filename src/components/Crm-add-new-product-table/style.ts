export const checkBox = {
  '& .MuiSvgIcon-root': {
    fontSize: 25
  },
  '&:not(.Mui-checked)': {
    'color': '#5D5FEF',
    '& .MuiSvgIcon-root': {
      fill: '#5D5FEF',
      opacity: 0.7
    }
  },
  '&.Mui-checked': {
    'color': '#FFFFFF',
    '& .MuiSvgIcon-root': {
      fill: '#5D5FEF'
    }
  }
}

export const table = {
  backgroundColor: '#ffffff',
  color: '#ffffff'
}

export const cell = {
  color: '#64748B',
  fontWeight: 400
}

export const input = {
  'width': 100,
  '& .MuiInputBase-input': {
    p: '7px 15px',
    backgroundColor: '#ffffff',
    color: '#64748B',
    textAlign: 'center'
  }
}

export const body1Label = {
  color: '#64748b',
  fontSize: 14,
  fontWeight: 500
}
export const boxCheckbox = {
  display: 'flex',
  alignItems: 'center',
  mt: 2,
  position: 'relative',
  right: 10
}
