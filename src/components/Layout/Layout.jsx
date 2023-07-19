const Layout = ({ children }) => {
    return (
      <>
        <header>HEADER</header>
        <div>{children}</div>
        <footer>FOOTER</footer>
      </>
  )
};
  
export default Layout;