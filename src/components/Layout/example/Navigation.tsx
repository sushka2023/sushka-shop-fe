import { motion } from 'framer-motion'
import { MenuItem } from './MenuItem'

import styles from './example.module.scss'

const visibilityVisible = 'visible' as const
const visibilityHidden = 'hidden' as const

const variants = {
  open: {
    opacity: 1, // Показує елементи
    visibility: visibilityVisible, // Використовуємо константу
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    opacity: 0, // Приховує елементи
    visibility: visibilityHidden, // Використовуємо константу
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

export const Navigation = ({
  toggleOpen,
  isActive,
  setIsActive,
  isLessThan600px
}: any) => (
  <motion.ul className={styles.exampleUl} variants={variants}>
    {/* {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))} */}
    <MenuItem
      toggleOpen={toggleOpen}
      isActive={isActive}
      setIsActive={setIsActive}
      isLessThan600px={isLessThan600px}
    />
  </motion.ul>
)

// const itemIds = [0, 1, 2, 3, 4]
