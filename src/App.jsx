import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/layout.jsx';
import MainPage from './pages/main-page/mainPage.jsx';


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
