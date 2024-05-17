import { GRAY_MEDIUM } from '../../lib/mui/config/colors'

export const stInput = {
  '& input': {
    color: 'secondary.darker',
    backgroundColor: 'background.default'
  },
  '&.Mui-disabled': {
    color: 'secondary.darker'
  }
}

export const stBtn = {
  'backgroundColor': 'primary.darker',
  'color': 'background.default',
  'marginTop': 4,
  '&:disabled': {
    opacity: 0.6,
    backgroundColor: GRAY_MEDIUM
  },
  '&:hover': {
    color: 'primary.darker',
    backgroundColor: 'background.default'
  }
}
