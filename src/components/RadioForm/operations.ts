import { apiKey } from '../../hooks/useNovaPoshtaCity'

export const fetchNovaPoshtaaddress = async (
  refCity: string | null,
  valAddress: string
) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'searchSettlementStreets',
      methodProperties: {
        StreetName: valAddress,
        SettlementRef: refCity,
        Limit: 50
      }
    })
  }

  const response = await fetch(
    'https://api.novaposhta.ua/v2.0/json/',
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()
  return data.data
}
