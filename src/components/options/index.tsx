import { useState, useEffect, useRef, ReactNode, FC } from 'react'
import SettingsIcon from '../../icons/settings.svg?react'
import styles from './Options.module.scss'

type Props = {
  children: ReactNode
  value: string
}

const Options: FC<Props> = ({ children, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickDropdown = (e: MouseEvent) => {
      setIsOpen(!isOpen)

      if (!containerRef.current?.contains(e.target as HTMLElement)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickDropdown)

    return () => {
      document.removeEventListener('click', handleClickDropdown)
    }
  }, [isOpen])

  const applyDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement

    if (target.nodeName === 'BUTTON' || target.nodeName === 'svg') {
      return
    }

    e.stopPropagation()
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} ref={containerRef}>
        {value}
        <SettingsIcon />
      </button>
      {isOpen && (
        <div className={styles.dropdownContent} onClick={applyDropDown}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Options
