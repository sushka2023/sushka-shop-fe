export const paginationBlock = {
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  alignItems: 'center',
  p: '20px'
}

export const paginationItems = {
  'width': '100%',

  '& ul': {
    'position': 'relative',
    'justifyContent': 'center',
    'height': '40px',

    '& li:first-of-type > a, & li:last-of-type > a': {
      'border': '1px solid ',
      'borderColor': 'accent.color',
      'width': '174px',
      'height': '40px',
      'color': 'accent.color',

      '& div': {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px'
      }
    },

    '& li:first-of-type > a': {
      marginRight: '25px'
    },

    '& li:last-of-type > a': {
      marginLeft: '25px'
    }
  },

  '& .MuiPaginationItem-root': {
    color: 'accent.darker'
  },

  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: 'accent.darker',
    color: 'background.default'
  }
}
