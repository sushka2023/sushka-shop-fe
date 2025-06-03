const searchIconStyle = {
  'padding': 0,
  'width': 30,
  'height': 30,
  'color': 'secondary.darker',
  '&:hover': {
    color: 'primary.darker'
  }
}

const popoverStyle = {
  '.MuiPaper-rounded': {
    borderRadius: '8px',
    width: '220px',
    maxHeight: '400px'
  }
}

const inputStyle = {
  '& .MuiInputBase-input.MuiOutlinedInput-input': {
    backgroundColor: 'secondary.lighter',
    padding: 1
  }
}

const listElementStyle = {
  'display': 'flex',
  'gap': '5px',
  'alignItems': 'center',
  'color': 'secondary.darker',
  'maxHeight': '400px',
  '&:hover': {
    color: 'primary.darker'
  }
}

const elementImageStyle = {
  width: '60px',
  height: '60px',
  objectFit: 'contain'
}

const elementTextStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 1,
  fontWeight: 500,
  color: 'currentcolor'
}

export {
  searchIconStyle,
  popoverStyle,
  inputStyle,
  listElementStyle,
  elementImageStyle,
  elementTextStyle
}
