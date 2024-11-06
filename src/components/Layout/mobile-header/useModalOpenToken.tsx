import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const useModalOpenOnToken = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const searchToken = searchParams.get('token')

  useEffect(() => {
    if (searchToken) {
      setIsModalOpen(true)
    }
  }, [searchToken])

  return [isModalOpen, setIsModalOpen] as const
}

export default useModalOpenOnToken
