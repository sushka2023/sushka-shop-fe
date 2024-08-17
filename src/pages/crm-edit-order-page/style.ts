const selectStyle = {
  width: '200px',
  borderRadius: '10px',
  ['&>svg']: {
    color: 'accent.darker'
  },
  ['&:hover .MuiOutlinedInput-notchedOutline']: {
    borderColor: 'transparent'
  },
  [`&.Mui-focused`]: {
    [`& .MuiOutlinedInput-notchedOutline`]: {
      border: 'none',
      borderRadius: '10px'
    }
  },
  ['& .MuiSelect-select']: {
    border: '1px solid',
    borderRadius: '10px',
    borderColor: 'accent.darker',
    backgroundColor: '#fff',
    padding: '8px 20px',
    color: 'accent.darker',
    fontWeight: 600
  }
}

const btnStyle = {
  fontWeight: 600,
  textTransform: 'none',
  padding: '10px 30px',
  height: '40px',
  border: '1px solid'
}

const containedBtnStyle = {
  'backgroundColor': 'accent.darker',
  'borderColor': 'accent.darker',
  '&:hover': {
    color: 'accent.darker',
    border: '1px solid',
    backgroundColor: '#fff',
    borderColor: 'accent.darker'
  }
}

const orderDetailsIconStyle = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '70px',
  minHeight: '70px'
}

const multilineStyle = {
  ['.MuiOutlinedInput-root']: {
    padding: 0
  },
  ['& .MuiOutlinedInput-input']: {
    padding: '10px',
    backgroundColor: '#fff',
    width: '230px',
    color: '#000'
  },
  ['& .MuiOutlinedInput-notchedOutline']: {
    borderColor: '#C1C7D1',
    borderRadius: '0.5rem'
  },
  ['&:hover .MuiOutlinedInput-notchedOutline']: {
    borderColor: '#C1C7D1'
  },
  [`&.Mui-focused`]: {
    [`&.MuiOutlinedInput-notchedOutline`]: {
      borderColor: '#C1C7D1'
    }
  }
}

export {
  selectStyle,
  btnStyle,
  containedBtnStyle,
  orderDetailsIconStyle,
  multilineStyle
}
