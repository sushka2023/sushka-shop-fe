import React from 'react'
import { Alert, Box, Snackbar } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import { useSnackbar } from '../../hooks/useSnackbar'

const stSnackebar = {
  width: '100%',
  border: '1px solid #FEEEE1',
  backgroundColor: '#FFFFFF',
  boxShadow: `
   rgba(50, 50, 93, 0.15) 0px 13px 27px -5px,
   rgba(0, 0, 0, 0.1) 0px 8px 16px -5px
 `,
  color: '#567343',
  borderRadius: '10px  0 0 10px',
  fontWeight: 600,
  fontSize: 17,
  fontFamily: 'Open Sans',
  lineHeight: '23.4px',
  marginTop: 8,
  marginRight: -2
}

const CustomSnackbar: React.FC = () => {
  const { snackbarData, hideSnackbar } = useSnackbar()

  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={snackbarData.open}
        autoHideDuration={2000}
        onClose={hideSnackbar}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbarData.error ? 'error' : 'success'}
          variant="filled"
          sx={stSnackebar}
          icon={
            snackbarData.error ? (
              <InfoIcon sx={{ color: '#E11D48' }} />
            ) : (
              <CheckCircleIcon sx={{ color: '#FCC812' }} />
            )
          }
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default CustomSnackbar
