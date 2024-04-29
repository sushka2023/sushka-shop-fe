import { Paper, styled } from '@mui/material'

export const stAutocompleteBase = {
  'width': '390px',
  'padding': 0,
  '& .MuiInputBase-root': {
    border: 'none',
    color: '#567343'
  },
  '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
  'outline': 'none',
  'backgroundColor': '#F7F7F7',
  'margin': '10px 0',
  'borderRadius': '8px',

  '& ::placeholder': { color: '#9AAB8E' }
}
export const stAutocompleteBaseInput = {
  'padding': 0,
  '& .MuiInputBase-root': {
    border: 'none',
    color: '#567343'
  },
  '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
  'outline': 'none',
  'backgroundColor': '#F7F7F7',
  'borderRadius': '8px',
  '& ::placeholder': { color: '#9AAB8E' }
}

export const stTextFieldAutocomplete = {
  '& ::placeholder': { color: '#9AAB8E' },
  'color': '#567343'
}
export const stBoxAutocomplete = {
  position: 'absolute',
  top: 7,
  right: 10
}

export const BpIcon = styled('span')(() => ({
  'borderRadius': '50%',
  'width': 20,
  'height': 20,
  'border': '1.5px solid #9AAB8E',
  '&::hover': {
    border: 'transparent'
  }
}))
export const BpCheckedIcon = styled(BpIcon)({
  'backgroundColor': '#567343',
  'border': '1.5px solid transparent',
  '&::before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage: 'radial-gradient(#fff,#fff 40%,transparent 48%)',
    content: '""'
  },
  'input:hover ~ &': {
    backgroundColor: '#567343'
  }
})

export const stBtnEdit = {
  width: 300,
  height: 50,
  borderRadius: 2.5,
  color: '#FFFFFF',
  backgroundColor: '#FCC812',
  border: 'transparent',
  cursor: 'pointer',
  marginTop: 2.5,
  fontSize: 14,
  fontWeight: 700,
  fontFamily: 'Open Sans',
  boxShadow: 'none',
  [`&:hover`]: {
    backgroundColor: '#FFFFFF',
    color: '#FCC812',
    border: '2px solid rgba(252, 200, 18, 0.8)',
    boxShadow: 'none'
  }
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))
