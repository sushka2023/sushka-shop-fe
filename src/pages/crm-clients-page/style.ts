export const seacrhClient = {
  'width': '300px',
  '& div, & input': {
    backgroundColor: 'background.default',
    borderRadius: '10px'
  },
  '& input': {
    paddingLeft: '0px',
    color: 'illustrations.darker'
  }
}

export const tableClients = {
  'minWidth': 650,
  'color': 'illustrations.darker',
  'th, td': { color: 'inherit' },

  'thead': {
    tr: {
      th: {
        fontSize: '14px'
      }
    }
  },
  'tr': {
    cursor: 'pointer'
  },
  'th': {
    '> span': {
      fontWeight: 600,
      borderRadius: '10px',
      padding: '5px 10px'
    }
  }
}

export const paginationItems = {
  '& .MuiPaginationItem-root': {
    color: 'accent.darker'
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: 'accent.darker',
    color: 'background.default'
  }
}
