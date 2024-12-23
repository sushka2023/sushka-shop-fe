import { useEffect, useRef } from 'react'

type Dimensions = {
  width: number
  height: number
}

export const useDimensions = (
  ref: React.RefObject<HTMLElement>
): Dimensions => {
  const dimensions = useRef<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      dimensions.current = {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      }
    }
  }, [ref])

  return dimensions.current
}
