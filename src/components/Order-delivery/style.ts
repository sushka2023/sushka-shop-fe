const cardStyle = {
  width: '250px',
  height: '200px',
  boxShadow: 'none',
  border: '1px solid #FEEEE1',
  borderRadius: '10px'
}

const cardCheckedStyle = {
  width: '250px',
  height: '200px',
  color: 'white',
  backgroundColor: 'primary.darker',
  border: '1px solid #FCC812',
  boxShadow: 'none',
  borderRadius: '10px'
}

const radioStyle = {
  opacity: 0,
  position: 'absolute'
}

const cardHeaderStyle = {
  'padding': '15px 10px 4px',
  '& .MuiCardHeader-avatar': { marginRight: '10px' }
}

const newAdressBtnStyle = {
  'marginTop': '20px',
  'border': 'none',
  'fontSize': '18px',
  'lineHeight': '18.2px',
  'letterSpacing': 'normal',
  'textTransform': 'none',
  'color': 'rgba(86, 115, 67, 1)',
  'fontWeight': '400',
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

export {
  cardStyle,
  radioStyle,
  cardHeaderStyle,
  cardCheckedStyle,
  newAdressBtnStyle
}
