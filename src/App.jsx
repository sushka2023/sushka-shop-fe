import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/main-page/MainPage';
import ProductsTable from './crm/pages/products-table/ProductsTable';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

// test for ProductsTable markup

// function App() {
//   return (
//     <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<ProductsTable />} />
//         </Routes>
//     </BrowserRouter>
//   );
// };

// export default App; 