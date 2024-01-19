import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllCategories } from './Redax/Products/selectors/Selectors'
import Layout from './components/Layout/Layout'
import MainPage from './pages/main-page/MainPage'
import CatalogPage from './pages/catalog-page/CatalogPage'
import FavoritePage from './pages/favorite-page/FavoritePage'
import LayoutCRM from './components/LayoutCRM/LayoutCRM'
import CrmSettingsPage from './pages/crmSettings-page/CrmSettingsPage'
import ProductPage from './pages/product-page/ProductPage'
import CrmProductsPage from './pages/crm-products-page/CrmProductsPage'
import CrmAddNewProduct from './pages/crm-add-new-product/CrmAddNewProduct'
import ConditionsPage from './pages/conditions-page/ConditionsPage'
import PrivacyPolicyPage from './pages/conditions-page/RrivacyPolicyPage'

function App() {
  const navigate = useNavigate()
  const allCategories = useSelector(selectAllCategories)

  useEffect(() => {
    const currentPath = window.location.pathname
    if (currentPath === '/catalog' && allCategories) {
      navigate(`catalog/${allCategories[0].id}/0`)
    }
  }, [allCategories, navigate])

  return (
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
          element={<div style={{ marginBottom: '500px' }}>Відгуки</div>}
        />
        <Route
          path="cooperation"
          element={<div style={{ marginBottom: '500px' }}>Співпраця</div>}
        />
        <Route
          path="account"
          element={<div style={{ marginBottom: '500px' }}>Акаунт</div>}
        />
        <Route path="favorite" element={<FavoritePage />} />
        <Route
          path="account"
          element={<div style={{ marginBottom: '500px' }}>Акаунт</div>}
        />
        <Route
          path="cart"
          element={<div style={{ marginBottom: '500px' }}>Корзина</div>}
        />
        <Route path="conditions" element={<ConditionsPage />} />
        <Route path="policy" element={<PrivacyPolicyPage />} />
      </Route>

      <Route path="crm" element={<LayoutCRM />}>
        <Route
          path="dashbord"
          element={<div style={{ marginBottom: '500px' }}>Dashboard page</div>}
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
          element={<div style={{ marginBottom: '500px' }}>clients params</div>}
        />
        <Route
          path="opinions"
          element={<div style={{ marginBottom: '500px' }}>Opinions Page</div>}
        />
        <Route path="settings" element={<CrmSettingsPage />} />
        <Route index element={<Navigate to="dashbord" replace />} />
      </Route>
    </Routes>
  )
}

export default App
