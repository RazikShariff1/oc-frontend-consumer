import { CartProvider } from './context/CartContext.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Categories from './components/Categories.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import BrandsMarquee from './components/BrandsMarquee.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'

function App() {
  return (
    <CartProvider>
      <Nav />
      <main>
        <Hero />
        <Categories />
        <ProductGrid />
        <BrandsMarquee />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}

export default App
