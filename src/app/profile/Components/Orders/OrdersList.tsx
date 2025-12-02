import React from "react";
import { Order, OrderProps } from "./Order";
import { useEffect, useState } from "react";

interface OrderListProps {
    email?: string;
    classname?: string;
}

export default function OrdersList({ email, classname }: OrderListProps) {

    const [orders, setOrders] = useState<OrderProps[]>([]);
        
    useEffect(() => {
        if (!email) return;

        const fetchOrders = async () => {
            try {
            const url = "/api/payment/orders";
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            }
            );
            const data = await res.json();
            console.log(data.data.orders);
            setOrders(data.data.orders);
            } catch (err) {
            console.error("Error fetching balance:", err);
            }
        };

        fetchOrders();
    }, [email]);

    const handleOrderDeleted = (orderId: string) => {
        setOrders((prev) => prev.filter((order) => order.order_id !== orderId));
    };

  return (
    <div className={"flex flex-col h-full w-full gap-4" + (classname ? ` ${classname}` : "")}>
        {orders.length === 0 ? (
            <p className="text-gray-400">No orders yet.</p>
        ) : (
            orders.map((order, index) => (
                <Order
                    key={index}
                    order_id={order.order_id}
                    post_title={order.post_title}
                    order_date={order.order_date.slice(2,10)}      
                    num_datapoints={order.num_datapoints}
                    order_time={order.order_time.slice(0,5)}
                    onDelete={handleOrderDeleted}
                />
            ))
        )}
    </div>
  );
}

export {OrdersList}