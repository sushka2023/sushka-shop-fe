import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './components/Layout/Layout'
import MainPage from './pages/main-page/MainPage'
import CatalogPage from './pages/catalog-page/CatalogPage'
import FavoritePage from './pages/favorite-page/FavoritePage'
import LayoutCRM from './components/LayoutCRM/LayoutCRM'
import CrmSettingsPage from './pages/crmSettings-page/CrmSettingsPage'
import ProductPage from './pages/product-page'
import CrmProductsPage from './pages/crm-products-page/CrmProductsPage'
import CrmAddNewProduct from './pages/crm-add-new-product/CrmAddNewProduct'
import ConditionsPage from './pages/conditions-page/ConditionsPage'
import PrivacyPolicyPage from './pages/conditions-page/RrivacyPolicyPage'
import CooperationPage from './pages/cooperation-page/CooperationPage'
import { AppDispatch, RootState } from './redux/store'
import { currentUser } from './redux/authentication/operation'
import PrivateRoute from './components/privste-route'
import AccountPage from './pages/account-page'
import FeedbackPage from './pages/feedback-page/FeedbackPage'
function App() {
  const navigate = useNavigate()
  const allCategories = useSelector(
    (state: RootState) => state.items.allCategories
  )
  const dispatch = useDispatch<AppDispatch>()

  const token = useSelector((state: RootState) => state.auth.accessToken)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  useEffect(() => {
    const currentPath = window.location.pathname
    if (currentPath === '/catalog' && allCategories) {
      navigate(`catalog/${allCategories[0].id}/0`)
    }
  }, [allCategories, navigate])

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(
        currentUser({ accessToken: token, operationType: 'currentUser' })
      )
    }
  }, [token, isLoggedIn])

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="catalog">
            <Route path=":category/:page" element={<CatalogPage />} />
            <Route
              path=":category/:productId/details"
              element={<ProductPage />}
            />
          </Route>
          <Route
            path="review"
            element={<FeedbackPage/>}
          />
          <Route path="favorite" element={<FavoritePage />} />
          <Route
            path="/account"
            element={
              <PrivateRoute redirectTo="/" component={<AccountPage />} />
            }
          />
          <Route
            path="cart"
            element={<div style={{ marginBottom: '500px' }}>Корзина</div>}
          />
          <Route path="conditions" element={<ConditionsPage />} />
          <Route path="policy" element={<PrivacyPolicyPage />} />
          <Route path="cooperation" element={<CooperationPage />} />
        </Route>

        <Route path="crm" element={<LayoutCRM />}>
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
