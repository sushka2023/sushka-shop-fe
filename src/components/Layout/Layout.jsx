import PropTypes from "prop-types";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/index";
import Footer from "./footer/index";
import { useLocation  } from "react-router-dom";

const Layout = () => {

  const location = useLocation()
  console.log(location, 'lal')
  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
