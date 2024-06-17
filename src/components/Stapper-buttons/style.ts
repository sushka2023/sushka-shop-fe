const btnContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  pt: 2
}

const btnNextStyle = {
  'width': '100%',
  'maxWidth': '250px',
  'textTransform': 'upperCase',
  'fontWeight': '600',
  'padding': '15px 30px',
  'borderRadius': '10px',
  'backgroundColor': 'rgba(86, 115, 67, 1)',
  'borderColor': 'inherit',
  'color': 'rgba(255, 255, 255, 1)',
  'fontSize': '14px',
  'lineHeight': '17px',
  '&:hover': {
    color: 'rgba(255, 255, 255, 1)',
    borderColor: 'inherit',
    backgroundColor: 'rgba(86, 115, 67, 0.85)'
  }
}

const btnBackStyle = {
  'border': 'none',
  'fontSize': '14px',
  'lineHeight': '18.2px',
  'letterSpacing': 'normal',
  'textTransform': 'none',
  'color': 'rgba(86, 115, 67, 1)',
  'fontWeight': '500',
  '&:hover': {
    border: 'none',
    backgroundColor: 'inherit',
    color: 'rgba(86, 115, 67, 1)'
  },
  '&.Mui-disabled': {
    border: 'none',
    backgroundColor: 'inherit',
    color: '#D9D9D9'
  }
}

export { btnContainerStyle, btnBackStyle, btnNextStyle }
