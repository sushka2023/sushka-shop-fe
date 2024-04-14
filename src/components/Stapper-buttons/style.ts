const btnContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  pt: 2
}

const btnNextStyle = {
  'width': '250px',
  'height': '50px',
  'padding': '15px 30px',
  'borderRadius': '10px',
  'backgroundColor': 'rgba(86, 115, 67, 1)',
  'color': 'rgba(255, 255, 255, 1)',
  'fontFamily': 'Open Sans',
  'fontWeight': '600',
  'fontSize': '14px',
  'lineHeight': '18.2px',
  'letterSpacing': 'normal',
  '&:hover': {
    backgroundColor: 'rgba(86, 115, 67, 0.85)'
  }
}

const btnBackStyle = {
  fontFamily: 'Open Sans',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '18.2px',
  letterSpacing: 'normal',
  textTransform: 'none',
  color: 'rgba(86, 115, 67, 1)'
}

export { btnContainerStyle, btnBackStyle, btnNextStyle }
