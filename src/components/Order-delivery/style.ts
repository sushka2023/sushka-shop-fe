const cardStyle = {
  width: '250px',
  boxShadow: 'none',
  border: '1px solid #FEEEE1',
  borderRadius: '10px'
}

const cardCheckedStyle = {
  width: '250px',
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

export { cardStyle, radioStyle, cardHeaderStyle, cardCheckedStyle }
