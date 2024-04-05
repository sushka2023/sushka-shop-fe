import React from 'react'

interface ErrorDisplayProps {
  error: string | undefined
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <React.Fragment>
      {error && <div style={{ color: '#D21C1C' }}>{error}</div>}
    </React.Fragment>
  )
}

export default ErrorDisplay
