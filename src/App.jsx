import {Routes, Route, Link} from "react-router-dom"
import MainPage from "./conteiners/MainPage/MainPage";
import './style.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
    </Routes>
  )
};

export default App;
