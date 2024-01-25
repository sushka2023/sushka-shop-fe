import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store, persister } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import App from './App.jsx'

import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
