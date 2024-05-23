import { FC, ReactNode, createContext, useState } from 'react'
import CustomSnackbar from '../components/CustomSnackbar/CustomSnackbar'

type SnackbarData = {
  open: boolean
  error: boolean
  message?: string
}

type SnackbarContext = {
  snackbarData: SnackbarData
  showSnackbar: (data: Omit<SnackbarData, 'open'>) => void
  hideSnackbar: () => void
}

export const SnackbarContext = createContext<SnackbarContext>(
  {} as SnackbarContext
)

export const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState<SnackbarData>({
    open: false,
    error: false
  })

  const showSnackbar = (data: Omit<SnackbarData, 'open'>) => {
    setSnackbarData({ open: true, ...data })
  }

  const hideSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false })
  }

  return (
    <SnackbarContext.Provider
      value={{ snackbarData, showSnackbar, hideSnackbar }}
    >
      {children}
      <CustomSnackbar />
    </SnackbarContext.Provider>
  )
}
