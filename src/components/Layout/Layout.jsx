import PropTypes from "prop-types";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/index";
import Footer from "./footer/index";

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense>
        <main>
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
