import { useState, useEffect } from 'react'

export default function useDebounce<Type>(
  value: Type,
  delay: number,
  cb?: () => void
) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      if (cb) cb()
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, cb])

  return debouncedValue
}
