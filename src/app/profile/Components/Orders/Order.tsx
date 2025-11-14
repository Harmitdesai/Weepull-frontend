import React from "react";
import { Trash2, Download } from "lucide-react";

export interface OrderProps {
    order_id: string;
    post_title: string;
    order_date: string;
    num_datapoints: number;
    order_time: string;
    classname?: string;
    onDelete?: (orderId: string) => void;
}

export default function Order({ order_id, post_title, order_date, num_datapoints, order_time, classname, onDelete }: OrderProps) {

  const handleDeleteOrder = async (orderId: string) => {
    const url = "http://localhost:8080/payment/deleteOrder";
    try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order_id: orderId }),
    })
    
    const data = await res.json();
    
      if (data.success) {
        onDelete?.(orderId);
      } else {
        alert("Failed to delete order: " + data.error);
      }

    } catch (err) {

      alert("Error deleting order:" + err);

    }
};

const downloadZip = async () => {
  const response = await fetch('http://localhost:8080/dataFetch/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order_id: order_id }),
  });
  const blob = await response.blob();

  console.log("Downloaded blob:", blob);

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${order_id}.zip`; // custom filename for the downloaded ZIP
  document.body.appendChild(link);
  link.click();
  link.remove();
};

  return (
     <div
      className={
        "flex flex-row items-center justify-between gap-6 w-full h-14 px-6 bg-white/5 shadow-md border-t border-white/10 rounded-lg hover:bg-white/10 transition-all duration-200" +
        (classname ? ` ${classname}` : "")
      }
    >
      <span className="text-gray-300 font-medium w-[10%]">{order_id}</span>
      <span className="text-gray-300 font-medium w-[40%] truncate">{post_title}</span>
      <span className="text-gray-300 font-medium w-[15%]">{order_date}</span>
      <span className="text-gray-300 font-medium w-[15%]">{num_datapoints}</span>
      <span className="text-gray-300 font-medium w-[10%]">{order_time}</span>

      {/* Icons Section */}
      <div className="flex flex-row items-center justify-end gap-4 w-[10%]">
        <Download
          size={20}
          className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
          onClick={downloadZip}
        />
        <Trash2
          size={20}
          className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors duration-200"
          onClick={() => handleDeleteOrder(order_id)}
        />
      </div>
    </div>

  );
}

export {Order}