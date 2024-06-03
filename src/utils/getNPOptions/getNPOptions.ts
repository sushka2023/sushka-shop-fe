const apiKey = 'f07607422838cfac21a0d1b8603086ca'

const getNovaPoshtaOptions = (cityName: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: cityName,
        Limit: 20,
        Page: 1
      }
    })
  }

  return requestOptions
}

export { getNovaPoshtaOptions }
