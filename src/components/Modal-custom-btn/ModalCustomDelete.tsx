import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'
import { ModalCustom } from './ModalCustomWindow'
import { Stack, Typography } from '@mui/material'
import { Button } from '../UI/Button'
import { btnEditModWin } from './style'
import { getToken } from '../../utils/cookie/token'
import { useSnackbar } from '../../hooks/useSnackbar'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import axiosInstance from '../../axios/settings'
import { currentUser } from '../../redux/authentication/operation'
import { NovaPoshtaDataResponse, UkrPoshtaResponse } from '../../types'
import { useAuth } from '../../hooks/use-auth'

type TypeProps = {
  indexToDelete: number | null
  openModalDel: boolean
  addressUser: (NovaPoshtaDataResponse | UkrPoshtaResponse)[]
  setOpenModalDel: Dispatch<SetStateAction<boolean>>
  setDisabled: Dispatch<SetStateAction<boolean>>
}

const accessToken = getToken()

const deleteAddress = async ({
  id,
  postCode,
  postsId
}: {
  id: number
  postCode?: string
  postsId?: number
}) => {
  const endpoint = postCode
    ? '/api/posts/remove_ukr_postal_office'
    : '/api/posts/remove_nova_poshta_data'

  const requestData = postCode
    ? { ukr_poshta_id: id }
    : { post_id: postsId, nova_poshta_id: id }

  try {
    await axiosInstance.delete(endpoint, { data: requestData })
  } catch (error) {
    console.error('Помилка видалення адреси:', error)
  }
}

function isNovaPoshtaDataResponse(
  address: NovaPoshtaDataResponse | UkrPoshtaResponse
): address is NovaPoshtaDataResponse {
  return (address as NovaPoshtaDataResponse).post_code !== undefined
}

export const ModalCustomDelete: FC<TypeProps> = ({
  openModalDel,
  setOpenModalDel,
  setDisabled,
  addressUser,
  indexToDelete
}) => {
  const { user } = useAuth()
  const { showSnackbar } = useSnackbar()
  const dispatch = useDispatch<AppDispatch>()
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)

  const handleDelCard = async () => {
    if (indexToDelete === null) return

    const address = addressUser[indexToDelete]
    const id = address.id
    const postsId = user?.posts.id
    let postCode: string | undefined

    if (isNovaPoshtaDataResponse(address)) {
      postCode = address.post_code
    }

    setDisabled(true)
    setIsLoadingBtn(true)
    try {
      await deleteAddress({ id, postCode, postsId })
      showSnackbar({ error: false, message: 'Адреса видалена...' })
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
    } catch (error) {
      showSnackbar({ error: false, message: 'Сталась помилка' })
      console.error(error)
    } finally {
      setDisabled(false)
      setIsLoadingBtn(false)
      setOpenModalDel(false)
    }
  }

  return (
    <Fragment>
      <ModalCustom
        openModal={openModalDel}
        setOpenModal={setOpenModalDel}
        sx={{
          width: '95%'
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="body1"
          sx={{ fontSize: 22, fontWeight: 600 }}
        >
          Видалити адресу
        </Typography>

        <Typography
          id="modal-modal-description"
          variant="body2"
          sx={{ mt: 3, fontWeight: 400, fontSize: 18 }}
        >
          Ви точно бажаєте видалити цю адресу?
        </Typography>
        <Stack
          spacing={2}
          direction="row"
          sx={{ marginTop: '40px', width: '100%' }}
        >
          <Button
            variant="outlined"
            onClick={() => setOpenModalDel(false)}
            sx={{
              width: '50%',
              height: 50,
              textTransform: 'capitalize'
            }}
          >
            Скасувати
          </Button>
          <Button
            variant="outlined"
            onClick={handleDelCard}
            sx={{
              ...btnEditModWin,
              width: '50%',
              height: 50,
              textTransform: 'capitalize'
            }}
            disabled={isLoadingBtn}
          >
            {isLoadingBtn ? 'Loading...' : 'Видалити'}
          </Button>
        </Stack>
      </ModalCustom>
    </Fragment>
  )
}
