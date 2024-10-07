export const modalDialog = {
  '& .MuiPaper-root ': {
    boxShadow: '2px 4px 20px 2px #B8B8B84D',
    color: 'illustrations.darker',
    padding: '5px 15px 15px 20px'
  }
}

export const infoIcon = {
  position: 'absolute',
  top: '20px',
  left: '12px',
  color: '#E11D48'
}

export const closeIcon = {
  position: 'absolute',
  top: '20px',
  right: '12px',
  color: 'inherit',
  cursor: 'pointer'
}

export const actionsBtn = {
  'gap': '15px',
  'mt': '15px',

  '& button': {
    height: '40px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600'
  },

  '& button:first-of-type': {
    border: '1px solid',
    borderColor: 'accent.darker',
    color: 'accent.darker'
  },
  '& button:last-of-type': {
    backgroundColor: 'accent.darker',
    color: 'background.default'
  }
}
