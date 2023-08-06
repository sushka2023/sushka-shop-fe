import PropTypes from "prop-types";
import Header from "./header/index";
import Footer from "./footer/index";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
