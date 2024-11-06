import { Fragment, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDimensions } from './use-dimensions'
import { Navigation } from './Navigation'
import { MenuToggle } from './MenuToggle'

import styles from './example.module.scss'
import { useLocation } from 'react-router-dom'

const sidebar = {
  open: (height = 1000) => ({
    // clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`, // точка відкриття справа
    transition: {
      visibility: '',
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    // clipPath: 'circle(30px at 40px 40px)',
    clipPath: 'circle(30px at calc(100% - 40px) 40px)', // точка закриття справа
    transition: {
      visibility: 'hidden',
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}

export const Example = ({ isOpen, toggleOpen }: any) => {
  const location = useLocation()
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  useEffect(() => {
    // Вимкнути прокручування при відкритті меню
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // Очищення стилю при демонтажі компонента
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    // Закрити меню при зміні шляху
    if (isOpen) {
      toggleOpen()
    }
  }, [location.pathname]) // Виконується щоразу, коли змінюється location.pathname

  return (
    <Fragment>
      <motion.div
        className={styles.exampleNav}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
      >
        <motion.div className={styles.exampleBackground} variants={sidebar} />
        <Navigation toggleOpen={toggleOpen} />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.div>
    </Fragment>
  )
}
