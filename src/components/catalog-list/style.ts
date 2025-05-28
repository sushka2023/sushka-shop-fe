const productsListStyle = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(1, minmax(350px, 1fr))',
    sm: 'repeat(auto-fit, minmax(350px, 1fr))',
    md: 'repeat(3, minmax(300px, 1fr))'
  },
  justifyContent: {
    xs: 'center',
    sm: 'center',
    md: 'space-between'
  },
  gap: '50px 24px'
}

export { productsListStyle }
