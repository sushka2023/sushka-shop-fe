import { Fragment } from 'react/jsx-runtime'
import { FormikErrors, FormikTouched } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { SignUpValues } from './Auth'
import Notification from '../Notification/Notification'
import ResetPassForm from './ResetPassForm'
import { ActionType } from './Auth'

type Props = {
  resetPassToken: string | null
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  apiError?: number
  setResetPass: (value: boolean) => void
  resetPass: boolean
  setActionType: (actionType: ActionType) => void
}

const ResetPasswordModal: React.FC<Props> = ({
  setActionType,
  resetPassToken,
  setResetPass,
  errors,
  touched,
  apiError,
  resetPass
}) => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const error = useSelector((state: RootState) => state.auth.errors)
  const sendEmail = useSelector((state: RootState) => state.auth.sendEmail)

  return (
    <Fragment>
      {isLoading ? (
        <div>loading...</div>
      ) : error && !resetPass ? (
        <Notification mode={'error'} />
      ) : !sendEmail ? (
        <ResetPassForm
          setActionType={setActionType}
          resetPass={resetPass}
          errors={errors}
          touched={touched}
          apiError={apiError}
          setResetPass={setResetPass}
          resetPassToken={resetPassToken}
        />
      ) : (
        <Notification mode={'resetPass'} />
      )}
    </Fragment>
  )
}

export default ResetPasswordModal
