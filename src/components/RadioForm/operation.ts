import { getNovaPoshtaOptions } from '../../utils/getNPOptions/getNPOptions'

const fetchNovaPoshtaCity = async (cityName: string) => {
  try {
    const response = await fetch(
      'https://api.novaposhta.ua/v2.0/json/',
      getNovaPoshtaOptions(cityName)
    )
    const info = await response.json()
    console.log(info.data[0].Addresses)
    return info.data[0].Addresses
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export { fetchNovaPoshtaCity }
