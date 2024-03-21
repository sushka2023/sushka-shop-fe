const selectStyle = {
  'display': 'block',
  'paddingLeft': '0px',
  'width': '200px',
  'borderRadius': '10px',
  'fontFamily': 'Open Sans',
  'color': '#64748b',
  '& .MuiList-root': {
    padding: '14px 0px',
    borderRadius: '8px'
  },
  '& .MuiSelect-select': {
    padding: '12px 14px',
    width: 'auto'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(100, 116, 139, 0.2)'
  }
}

const labelStyle = {
  fontSize: '18px',
  fontWeight: '500',
  fontFamily: 'Open Sans',
  top: '-24px',
  color: '#64748b'
}

export { selectStyle, labelStyle }
