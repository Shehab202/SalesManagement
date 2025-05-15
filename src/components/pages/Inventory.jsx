
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Loader from "../Loader";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "inventory"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const totalInventoryValue = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
  if (loading) {
    return <Loader/>
  }

  return (
    <div className=" bg-slate-900 md:p-8 ">
    <div className="w-5/6 mx-auto flex flex-col items-center min-h-screen">
      <h2 className="sm:text-2xl font-bold mb-4 text-gray-200">المخزون</h2>
      {products.length === 0 ? (
        <p className="text-lg font-bold mt-4 sm:mt-5 text-gray-200">لا توجد منتجات في المخزون</p>
      ) : (
        <>
          <table className="w-full border-collapse "dir="rtl">
            <thead className=" text-gray-200 ">
              <tr className="bg-slate-800 " >
                <th className="border p-2">اسم المنتج</th>
                <th className="border p-2">السعر</th>
                <th className="border p-2">العدد المتاح</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border  text-sky-200">
                  <td className="border p-3 ">{product.productName}</td>
                  <td className="border p-3">{product.price}</td>
                  <td className="border p-3">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sm:text-2xl text-sm text-end sm:text-center font-bold mt-4 text-gray-200">
            إجمالي قيمة المخزون: {totalInventoryValue} جنيه
          </p>
        </>
      )}
    </div>
    </div>
  );
};

export default Inventory;
