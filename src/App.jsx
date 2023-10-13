import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/main-page/MainPage";
import CatalogPage from "./pages/catalog-page/CatalogPage";
import FavoritePage from "./pages/favorite-page/FavoritePage";
import LayoutCRM from "./components/LayoutCRM/LayoutCRM";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="catalog">
          <Route path=":params/:page" element={<CatalogPage />} />
        </Route>
        <Route
          path="cooperation"
          element={<div style={{ marginBottom: "500px" }}>Співпраця</div>}
        />
        <Route
          path="account"
          element={<div style={{ marginBottom: "500px" }}>Акаунт</div>}
        />
        <Route path="favorite" element={<FavoritePage />} />
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
      </Route>

      <Route path="crm" element={<LayoutCRM />}>
        <Route
          path="dashbord"
          element={<div style={{ marginBottom: "500px" }}>Dashboard page</div>}
        />
        <Route
          path="orders"
          element={<div style={{ marginBottom: "500px" }}>Order page</div>}
        />
        <Route
          path="orders/:params"
          element={<div style={{ marginBottom: "500px" }}>orders params</div>}
        />
        <Route
          path="products"
          element={<div style={{ marginBottom: "500px" }}>Products page</div>}
        />
        <Route
          path="products/:params"
          element={<div style={{ marginBottom: "500px" }}>products params</div>}
        />
        <Route
          path="clients"
          element={<div style={{ marginBottom: "500px" }}>Clients page</div>}
        />
        <Route
          path="clients/:params"
          element={<div style={{ marginBottom: "500px" }}>clients params</div>}
        />
        <Route
          path="settings"
          element={<div style={{ marginBottom: "500px" }}>Settings page</div>}
        />
        <Route index element={<Navigate to="dashbord" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
