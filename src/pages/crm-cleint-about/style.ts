export const aboutRole = {
  backgroundColor: 'background.default',
  borderRadius: '10px',
  p: '30px 20px',
  mb: '30px'
}

export const changeRoleStyle = {
  'border': '1px solid',
  'borderColor': 'accent.darker',
  'borderRadius': '10px',
  '& button': {
    'width': '200px',
    'height': '40px',
    'color': 'accent.darker',
    'padding': 0,
    '&:hover': {
      color: 'accent.darker'
    },
    '& span': {
      fontSize: '16px',
      fontWeight: 600,
      margin: '0 10px 0 15px'
    }
  }
}

export const roleList = {
  'marginTop': '15px',

  '& > div:nth-of-type(3)': {
    borderRadius: '10px'
  },

  '& ul': {
    'width': '200px',
    'border': '1px solid',
    'borderColor': 'accent.darker',
    'borderRadius': '10px',

    '& li > svg': {
      color: 'accent.darker',
      marginRight: '10px',
      position: 'absolute',
      left: '15px'
    },

    '& li > span': {
      borderRadius: '10px',
      fontWeight: 600,
      ml: '30px',
      padding: '5px 10px'
    }
  }
}

export const saveNewRole = {
  'height': '40px',
  'borderRadius': '10px',
  'backgroundColor': 'accent.darker',
  'color': 'background.default',
  'fontWeight': '600',
  'fontSize': '16px',
  '&:hover': {
    backgroundColor: 'accent.darker',
    color: 'background.default'
  },
  '&:disabled': {
    backgroundColor: 'accent.darker',
    opacity: 0.5
  }
}
