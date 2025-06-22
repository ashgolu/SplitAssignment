'use client';
import { gql, useQuery } from '@apollo/client';
import { useCart } from '@/context/CartContext';

const GET_PRODUCTS = gql`
  query {
    getProducts {
      _id
      name
      price
    }
  }
`;

export default function ProductPage() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const { addToCart } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data.getProducts.map((product: any) => (
        <div key={product._id} className="border p-4 shadow">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>₹{product.price}</p>
          <button
            className="bg-blue-600 text-white px-2 py-1 mt-2 rounded"
            onClick={() => {
              addToCart(product);
              alert('Added to cart!');
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
