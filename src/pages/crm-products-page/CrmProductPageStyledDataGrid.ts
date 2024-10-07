import { styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export const StyledDataGrid = styled(DataGrid)({
  'border': 'none',
  'borderRadius': '8px',
  'height': '100%',
  'cursor': 'pointer',
  '& .MuiDataGrid-columnHeaders': {
    'fontFamily': 'Open Sans, sans-serif',
    'fontSize': '14px',
    'fontWeight': 400,
    'lineHeight': '19px',
    'letterSpacing': '0em',
    'textAlign': 'left',
    'color': '#64748B',
    'backgroundColor': '#F8FAFC',
    '&:focus, &:focus-within': {
      outline: 'none !important'
    }
  },
  '& .MuiDataGrid-columnHeader': {
    '&:focus, &:focus-within': {
      outline: 'none !important'
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      outline: 'none !important'
    }
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
    backgroundColor: 'white',
    width: '100%'
  },
  '& .MuiDataGrid-virtualScroller': {
    '& .MuiDataGrid-overlayWrapper': {
      height: 'auto !important'
    },
    '& .MuiDataGrid-overlayWrapperInner': {
      height: 'auto !important'
    },
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
      outline: 'none !important'
    },
    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
      {
        outline: 'none !important'
      },
    '& .MuiDataGrid-columnHeader:focus .MuiDataGrid-columnHeaderTitle': {
      outline: 'none !important'
    },
    'fontWeight': '400',
    'color': 'inherit'
  }
})
