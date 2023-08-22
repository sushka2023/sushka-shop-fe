import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/main-page/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="catalog"
          element={<div style={{ marginBottom: "500px" }}>Каталог</div>}
        />
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
      </Route>
    </Routes>
  );
}

export default App;
