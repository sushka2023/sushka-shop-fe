import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/main-page/MainPage';
import CatalogPage from './pages/catalog-page/CatalogPage';
import ConfirmedRegistration from './containers/ConfirmedRegistration/ConfirmedRegistration';

function App() {
   const location = useLocation();
   const cameBack = location.state?.from ?? "/";

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route
          path="catalog/:params"
          element={<div style={{ marginBottom: "500px" }}>catalog params</div>}
        />
        <Route
          path="cooperation"
          element={<div style={{ marginBottom: "500px" }}>Співпраця</div>}
        />
        <Route
          path="account"
          element={<div style={{ marginBottom: "500px" }}>Акаунт</div>}
        />
        <Route
          path="favorite"
          element={<div style={{ marginBottom: "500px" }}>Улюблене</div>}
        />
        <Route
          path="account"
          element={<div style={{ marginBottom: "500px" }}>Акаунт</div>}
        />
        <Route
          path="cart"
          element={<div style={{ marginBottom: "500px" }}>Корзина</div>}
        />
        <Route
          path="conditions"
          element={<div style={{ marginBottom: "500px" }}>conditions</div>}
        />
        <Route
          path="policy"
          element={<div style={{ marginBottom: "500px" }}>policy</div>}
        />
        <Route
          path="/api/auth/confirmed_email/:token"
          element={<ConfirmedRegistration />}
        />
      </Route>
      <Route
        path="crm"
        element={
          <div style={{ marginBottom: "500px" }}>
            <Link to={cameBack} style={{ border: "1px solid black" }}>
              GO BACK
            </Link>{" "}
            crm
          </div>
        }
      />
    </Routes>
  );
}

export default App;
