import { FormikErrors, FormikTouched } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { SignUpValues } from './Auth'
import ResetPassFormHeader from './ResetPassFormHeader'
import ResetPassFields from './ResetPassFields'
import Notification from '../Notification/Notification'
import { ActionType } from './Auth'
import styles from './auth.module.scss'

type Props = {
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  apiError?: number
  setResetPass: (value: boolean) => void
  setActionType: (actionType: ActionType) => void
  resetPassToken: string | null
  resetPass: boolean
}

const ResetPassForm: React.FC<Props> = ({
  setActionType,
  errors,
  touched,
  apiError,
  setResetPass,
  resetPassToken,
  resetPass
}) => {
  const resPass = useSelector((state: RootState) => state.auth.resPass)

  return (
    <div className={styles.modalContainer}>
      {!resetPassToken ? (
        <ResetPassFormHeader
          setActionType={setActionType}
          errors={errors}
          touched={touched}
          apiError={apiError}
          setResetPass={setResetPass}
          resetPass={resetPass}
        />
      ) : !resPass ? (
        <ResetPassFields
          setActionType={setActionType}
          errors={errors}
          touched={touched}
          apiError={apiError}
        />
      ) : (
        <Notification mode={'saveNewPass'} />
      )}
    </div>
  )
}

export default ResetPassForm
