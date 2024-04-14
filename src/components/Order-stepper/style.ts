const stepperStyle = {
  '& .MuiStepConnector-root': {
    flex: 'none',
    width: '25px',
    paddingRight: '20px'
  }
}

const stepStyle = {
  'padding': '0px 20px 0px 0px',
  '& .MuiStepLabel-iconContainer': {
    paddingRight: '20px'
  },
  '& .MuiStepIcon-root.Mui-active': {
    color: '#fcc812',
    width: '40px',
    height: '40px'
  },
  '.MuiStepIcon-root': {
    width: '40px',
    height: '40px',
    color: 'rgba(235, 234, 234, 1)'
  },
  '.MuiStepIcon-root.Mui-completed': {
    color: '#fcc812'
  }
}

const stepLabelStyle = {
  '& .MuiStepLabel-label.Mui-active': {
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '18px',
    color: '#fcc812'
  },
  '& .MuiStepLabel-label': {
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '18px',
    color: 'rgba(235, 234, 234, 1)'
  },
  '& .MuiStepLabel-label.Mui-completed': {
    fontWeight: '600',
    color: '#fcc812'
  }
}

export { stepperStyle, stepLabelStyle, stepStyle }
