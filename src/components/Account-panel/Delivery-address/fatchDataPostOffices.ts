import axiosInstance from '../../../axios/settings'

const fetchDataMyPostOffices = (
  setDeliveryAddresses: React.Dispatch<
    React.SetStateAction<{ nova_poshta: never[]; ukr_poshta: never[] }>
  >
) => {
  axiosInstance
    .get('/api/posts/my-post-offices')
    .then((response) => {
      setDeliveryAddresses(response.data)
    })
    .catch((error) => {
      console.error('Error', error)
    })
}

export default fetchDataMyPostOffices
