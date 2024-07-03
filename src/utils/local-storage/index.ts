const getLocalStorageData = (data: string) => {
  const localData = localStorage.getItem(data)
  return localData ? JSON.parse(localData) : null
}

export { getLocalStorageData }
