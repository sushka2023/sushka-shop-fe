import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store, persister } from './redux/store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { THEME } from './lib/mui/config/theme/index.js'

import App from './App.js'

import './styles/index.scss'
import { SnackbarProvider } from './context/SnackbarContext.js'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <SnackbarProvider>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter basename="/">
          <ThemeProvider theme={THEME}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </SnackbarProvider>
  </Provider>
)
