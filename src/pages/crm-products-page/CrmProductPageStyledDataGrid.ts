import { styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export const StyledDataGrid = styled(DataGrid)({
  'border': 'none',
  'borderRadius': '8px',
  'height': '100%',
  '& .MuiDataGrid-columnHeader': {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#64748B',
    backgroundColor: '#F8FAFC'
  },
  '& .MuiDataGrid-row': {
    backgroundColor: 'white'
  },
  '& .MuiTablePagination-displayedRows': {
    display: 'none'
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#F8FAFC',
    padding: '20px 0px',
    borderColor: 'transparent'
  },
  '& .MuiDataGrid-row:last-child': {
    '& .MuiDataGrid-cell': {
      border: 'none'
    }
  },
  '& .MuiDataGrid-virtualScrollerContent': {
    backgroundColor: 'white'
  },
  '& .MuiDataGrid-virtualScroller': {
    '& .MuiDataGrid-overlayWrapper': {
      height: 'auto !important'
    },

    '& .MuiDataGrid-overlayWrapperInner': {
      height: 'auto !important'
    }
  }
})
