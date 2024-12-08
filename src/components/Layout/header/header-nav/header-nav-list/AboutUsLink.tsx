import styles from '../../Header.module.scss'

import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

type AboutUsLinkProps = {
  toggleOpen: () => void
}

export const AboutUsLink = ({ toggleOpen }: AboutUsLinkProps) => {
  const location = useLocation()
  const isHomePath = location.pathname === '/'

  return (
    <Fragment>
      {isHomePath ? (
        <ScrollLink
          to="aboutUs"
          className={styles.listNavLink}
          smooth={true}
          duration={500}
          spy={true}
          hashSpy={true}
          onClick={toggleOpen}
        >
          Про нас
        </ScrollLink>
      ) : (
        <Link to="/#aboutUs" className={styles.listNavLink}>
          Про нас
        </Link>
      )}
    </Fragment>
  )
}
