export const searchBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '34px'
}

export const tableBlock = {
  height: '714px',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  boxShadow: 'none'
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
