export const boxTableHistoryOrder = {
  height: '418px',
  width: '100%',
  cursor: 'pointer'
}

export const tableHistoryOrder = {
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: 'transparent !important'
  },
  '& .MuiDataGrid-row.Mui-selected:hover': {
    backgroundColor: '#f5f5f5 !important'
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#f5f5f5'
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none'
  },
  'fontWeight': '400',
  'color': 'inherit'
}

export const baseStatusStyle: React.CSSProperties = {
  borderRadius: '10px',
  fontWeight: '600',
  padding: '5px 10px'
}

export const statusStyles: Record<string, React.CSSProperties> = {
  'new': {
    background: '#EFF3FF',
    color: 'accent.darker'
  },
  'in processing': {
    background: '#FFF9E3',
    color: '#E07706'
  },
  'shipped': {
    background: '#EFF9FF',
    color: '#178DCC'
  },
  'delivered': {
    background: '#E8FDF2',
    color: '#059691'
  },
  'cancelled': {
    background: '#F6E5EF',
    color: '#E11D48'
  }
}
