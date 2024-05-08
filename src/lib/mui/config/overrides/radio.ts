import { Components, Theme } from '@mui/material'

const MuiRadio: Components<Theme>['MuiRadio'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ['& .MuiSvgIcon-root']: {
        fill: theme.palette.secondary.darker
      },
      ['& .MuiSvgIcon-root:nth-of-type(2)']: {
        fill: 'white'
      },
      ['&::before']: {
        content: '""',
        borderRadius: '50%',
        width: '1.1em',
        height: '1.1em',
        position: 'absolute',
        background: 'white'
      },
      ['&.Mui-checked']: {
        ['&::before']: {
          background: theme.palette.secondary.darker
        },
        ['& .MuiSvgIcon-root:nth-of-type(2)']: {
          fill: 'white'
        }
      }
    })
  }
}

export { MuiRadio }
