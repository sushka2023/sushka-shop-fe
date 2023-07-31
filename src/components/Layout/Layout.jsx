import Header from './header/index';
import Footer from './footer/index';

const Layout = ({ children }) => {
    return (
      <>
        <Header/>
        <div style={{height:'1000px'}}>{children}</div>
        <Footer/>
      </>
  )
};
  
export default Layout;