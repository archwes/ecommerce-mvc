import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function NavBar() {
  const { cartItems } = useCart();
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      borderBottom: '1px solid #ccc'
    }}>
      {/* Link sem <a> interno */}
      <Link href="/">Home</Link>

      {/* Você pode envolver o botão diretamente */}
      <Link href="/checkout">
        <button>🛒 Carrinho ({cartItems.length})</button>
      </Link>
    </nav>
  );
}
