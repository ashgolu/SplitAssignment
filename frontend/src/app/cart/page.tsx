'use client';
import { useCart } from '../../context/CartContext';
import { useMutation } from '@apollo/client';
import { PLACE_ORDER } from '@/graphql/placeOrder';
import client from '@/lib/apollo-client';

export default function CartPage() {
  const { cart, clearCart } = useCart();

  const [placeOrder] = useMutation(PLACE_ORDER, { client });

  const handlePlaceOrder = async () => {
    try {
      const items = cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      console.log('Sending order:', items);
      const res = await placeOrder({ variables: { items } });
      console.log('Order Placed:', res.data.placeOrder);
      alert(`✅ Order placed with ID: ${res.data.placeOrder._id}`);
      clearCart();
    } catch (err: any) {
      alert('❌ Failed to place order');
      console.error(err.message);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map(item => (
              <li key={item._id}>
                {item.name} × {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="mb-4 font-semibold">Total: ₹{total}</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handlePlaceOrder}
          >
            📦 Place Order
          </button>
        </>
      )}
    </div>
  );
}
