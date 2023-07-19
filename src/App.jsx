import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import MainPage from './pages/main-page/MainPage.jsx';


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
