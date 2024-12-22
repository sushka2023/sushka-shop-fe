import styles from './BurgerMenu.module.scss'

import { motion } from 'framer-motion'

import { MenuItem } from './menu-item/MenuItem'
import { MenuItemProps } from './BurgerMenu'

const variants = {
  open: {
    opacity: 1,
    visibility: 'visible' as const,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    opacity: 0,
    visibility: 'hidden' as const,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

export const Navigation = ({
  isOpen,
  toggleOpen,
  isActive,
  setIsActive,
  isLessThan600px
}: MenuItemProps) => (
  <motion.ul className={styles.exampleUl} variants={variants}>
    <MenuItem
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      isActive={isActive}
      setIsActive={setIsActive}
      isLessThan600px={isLessThan600px}
    />
  </motion.ul>
)
