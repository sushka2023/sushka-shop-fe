import { Routes, Route, Navigate } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from './components/Layout/Layout'
import MainPage from './pages/main-page/MainPage'
import CatalogPage from './pages/catalog-page/CatalogPage'
import FavoritePage from './pages/favorite-page/FavoritePage'
import CrmSettingsPage from './pages/crmSettings-page/CrmSettingsPage'
import ProductPage from './pages/product-page'
import CrmProductsPage from './pages/crm-products-page/CrmProductsPage'
import CrmAddNewProduct from './pages/crm-add-new-product/CrmAddNewProduct'
import ConditionsPage from './pages/conditions-page/ConditionsPage'
import PrivacyPolicyPage from './pages/conditions-page/RrivacyPolicyPage'
import CooperationPage from './pages/cooperation-page/CooperationPage'
import { AppDispatch, RootState } from './redux/store'
import { currentUser } from './redux/authentication/operation'
import PrivateRouteAccount from './components/private-routes/PrivateRouteAccount.tsx'
import PrivateRouteCrm from './components/private-routes/PrivateRouteCrm'
import AccountPage from './pages/account-page/account-page'
import FeedbackPage from './pages/feedback-page/FeedbackPage'
import { getToken } from './utils/cookie/token'
import ShoppingListPage from './pages/shopping-list-page/ShoppingListPage'
import LayoutCRM from './components/LayoutCRM/LayoutCRM'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const accessToken = getToken()

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  useEffect(() => {
    if (accessToken && !isLoggedIn) {
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
    }
  }, [accessToken, isLoggedIn])

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="catalog">
            <Route path="all" element={<CatalogPage />} />
            <Route path=":category" element={<CatalogPage />} />
            <Route
              path=":category/:productId/details"
              element={<ProductPage />}
            />
          </Route>
          <Route path="review" element={<FeedbackPage />} />
          <Route path="favorite" element={<FavoritePage />} />
          <Route
            path="account"
            element={
              <PrivateRouteAccount redirectTo="/" component={<AccountPage />} />
            }
          />
          <Route path="cart" element={<ShoppingListPage />} />
          <Route path="conditions" element={<ConditionsPage />} />
          <Route path="policy" element={<PrivacyPolicyPage />} />
          <Route path="cooperation" element={<CooperationPage />} />
        </Route>

        <Route
          path="crm"
          element={<PrivateRouteCrm redirectTo="/" component={<LayoutCRM />} />}
        >
          <Route
            path="dashbord"
            element={
              <div style={{ marginBottom: '500px' }}>Dashboard page</div>
            }
          />
          <Route
            path="orders"
            element={<div style={{ marginBottom: '500px' }}>Order page</div>}
          />
          <Route
            path="orders/:params"
            element={<div style={{ marginBottom: '500px' }}>orders params</div>}
          />
          <Route path="products" element={<CrmProductsPage />} />

          <Route path="products/:params" element={<CrmAddNewProduct />} />

          <Route
            path="clients"
            element={<div style={{ marginBottom: '500px' }}>Clients page</div>}
          />
          <Route
            path="clients/:params"
            element={
              <div style={{ marginBottom: '500px' }}>clients params</div>
            }
          />
          <Route
            path="opinions"
            element={<div style={{ marginBottom: '500px' }}>Opinions Page</div>}
          />
          <Route path="settings" element={<CrmSettingsPage />} />
          <Route index element={<Navigate to="dashbord" replace />} />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
