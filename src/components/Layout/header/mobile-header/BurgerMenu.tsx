import styles from './BurgerMenu.module.scss'

import { useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'

import { useDimensions } from './use-dimensions'
import { Navigation } from './Navigation'
import { MenuToggle } from './MenuToggle'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`, // точка відкриття з права
    transition: {
      visibility: '',
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(30px at calc(100% - 40px) 40px)', // точка закриття з права
    transition: {
      visibility: '',
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}

export type MenuItemProps = {
  isOpen: boolean
  toggleOpen: (isOpen: boolean) => void
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  isLessThan600px: boolean
}

export const BurgerMenu = ({
  isOpen,
  toggleOpen,
  isActive,
  setIsActive,
  isLessThan600px
}: MenuItemProps) => {
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <motion.div
      className={styles.exampleNav}
      initial={closed}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={styles.exampleBackground} variants={sidebar} />
      <Navigation
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        isActive={isActive}
        setIsActive={setIsActive}
        isLessThan600px={isLessThan600px}
      />
      <MenuToggle isOpen={isOpen} toggleOpen={toggleOpen} />
    </motion.div>
  )
}
