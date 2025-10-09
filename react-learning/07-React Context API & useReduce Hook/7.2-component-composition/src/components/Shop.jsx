import { DUMMY_PRODUCTS } from '../dummy-products.js';
import Product from './Product.jsx';

// Here by using Component composition, we at least got rid of parts of Prop Drilling Problem.

export default function Shop({children}) {
    return (
        <section id="shop">
            <h2>Elegant Clothing For Everyone</h2>
            <ul id="products">{children}</ul>
        </section>
    );
}


export function Shop_old({ onAddItemToCart }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
