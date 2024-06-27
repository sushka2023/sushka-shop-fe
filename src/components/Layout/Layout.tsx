import { Fragment, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './header/index'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import Footer from './footer/index'

function Layout() {
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

export default Layout
