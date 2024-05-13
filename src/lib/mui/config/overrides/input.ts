import { Components, Theme } from '@mui/material'

const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    error: ({ theme }) => {
      return {
        [`&.Mui-focused`]: {
          [`& .MuiOutlinedInput-notchedOutline`]: {
            borderColor: 'inherit'
          }
        },
        ['&:hover .MuiOutlinedInput-notchedOutline']: {
          borderColor: theme.palette.error.darker
        },
        [`&.Mui-error`]: {
          [`& .MuiOutlinedInput-notchedOutline`]: {
            borderColor: theme.palette.error.darker
          }
        }
      }
    },
    input: ({ theme }) => {
      return {
        borderRadius: '0.5rem',
        backgroundColor: theme.palette.grey[50],
        padding: '0.75rem 1rem',
        color: theme.palette.secondary.darker
      }
    },
    root: ({ theme }) => {
      return {
        ['&.Mui-disabled']: {
          ['& .MuiOutlinedInput-notchedOutline']: {
            borderColor: 'transparent',
            borderRadius: '0.5rem'
          },
          ['&:hover .MuiOutlinedInput-notchedOutline']: {
            borderColor: 'transparent'
          }
        },
        ['& .MuiOutlinedInput-notchedOutline']: {
          borderColor: 'transparent',
          borderRadius: '0.5rem'
        },
        ['&:hover .MuiOutlinedInput-notchedOutline']: {
          borderColor: theme.palette.turquoise.main
        },
        [`&.Mui-focused`]: {
          [`& .MuiOutlinedInput-notchedOutline`]: {
            borderColor: theme.palette.turquoise.main
          }
        }
      }
    }
  }
}

export { MuiOutlinedInput }
