import PropTypes from 'prop-types'
import { Fragment, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './header/index'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import Footer from './footer/index'

const Layout = () => {
  const location = useLocation()
  const homePath = location.pathname === '/'

  return (
    <Fragment>
      <Header />
      {!homePath && <Breadcrumbs />}
      <Suspense>
        <main>
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
