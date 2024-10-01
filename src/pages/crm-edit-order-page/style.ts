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

const dataGridStyle = {
  'fontFamily': 'Open Sans, sans-serif',
  'fontSize': 14,
  'backgroundColor': 'white',
  'border': 'none',
  'borderRadius': '10px',
  'color': 'illustrations.darker',
  '& .MuiDataGrid-columnHeadersInner': {
    'width': '100%',
    '& > div': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between'
    }
  },
  '& .MuiDataGrid-columnHeaderRow': {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  '.MuiDataGrid-columnHeaders': {
    backgroundColor: '#F9F9FC'
  },
  '& .MuiDataGrid-columnHeader': {
    padding: 0
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'center'
  },
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    width: '100%'
  },
  '& .MuiDataGrid-row': {
    borderTop: '1px solid #F5F5FA',
    borderBottom: '1px solid #F5F5FA',
    width: '100%',
    justifyContent: 'space-between'
  },
  '& .MuiDataGrid-cell': {
    'padding': 0,
    'justifyContent': 'center',
    'border': 'none',
    '&:last-of-type': {
      display: 'none'
    }
  }
}

export {
  selectStyle,
  btnStyle,
  containedBtnStyle,
  orderDetailsIconStyle,
  multilineStyle,
  dataGridStyle
}
