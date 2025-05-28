import { keyframes } from '@emotion/react'

const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
`

const favoriteIconStyle = {
  position: 'absolute',
  top: '32px',
  right: '32px',
  color: '#E11D48',
  width: 30,
  height: 30,
  animation: `${heartbeat} 0.3s ease-in-out`
}

export { favoriteIconStyle }
