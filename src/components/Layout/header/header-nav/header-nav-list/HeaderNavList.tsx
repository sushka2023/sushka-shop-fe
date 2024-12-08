import styles from '../../Header.module.scss'

import CrmLink from '../CrmLink'
import { AboutUsLink } from './AboutUsLink'
import { CatalogLink } from './CatalogLink'
import { CooperationLink } from './CooperationLink'
import { ReviewLink } from './ReviewLink'

type HeaderNavListProps = {
  toggleOpen: () => void
}

type NavItem = {
  Component: React.FC<any>
  withToggle?: boolean
}

const navItems: NavItem[] = [
  { Component: CatalogLink },
  { Component: ReviewLink },
  { Component: AboutUsLink, withToggle: true },
  { Component: CooperationLink },
  { Component: CrmLink }
]

const HeaderNavList = ({ toggleOpen }: HeaderNavListProps) => (
  <ul className={styles.listNav}>
    {navItems.map(({ Component, withToggle }, index) => (
      <li key={index} className={styles.listNavLine}>
        <Component {...(withToggle ? { toggleOpen } : {})} />
      </li>
    ))}
  </ul>
)

export default HeaderNavList
