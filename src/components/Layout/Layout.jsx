
const Layout = ({ children }) => {
    return (
      <div>
        <header>HEADER</header>
        <div>{children}</div>
        <footer>FOOTER</footer>
      </div>
  )
};
  
export default Layout;