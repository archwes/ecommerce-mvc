import { CartProvider } from '../context/CartContext';
import NavBar from '../components/NavBar';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <NavBar />
      <Component {...pageProps} />
    </CartProvider>
  );
}
