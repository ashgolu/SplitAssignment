'use client';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '@/graphql/getOrders';

export default function OrdersPage() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📦 All Orders</h1>
      {data.getOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {data.getOrders.map((order: any) => (
            <li key={order._id} className="mb-4 p-2 border rounded">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Items:</strong></p>
              <ul className="ml-4 list-disc">
                {order.items.map((item: any, index: number) => (
                  <li key={index}>
                    {item.productId} × {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
