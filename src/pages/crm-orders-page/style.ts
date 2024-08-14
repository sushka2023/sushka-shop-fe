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
    backgroundColor: '#F9F9FC',
    padding: '10px 20px'
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

export { dataGridStyle }
