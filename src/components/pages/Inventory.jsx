
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Inventory = () => {
const navigate = useNavigate();

  const goToSalesInvoice = () => {
  navigate("/salesInvoice");
}
const goToPurchaseInvoice = () => {
  navigate("/purchaseInvoice");
}
  
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
    <div className=" bg-slate-800 pt-8 min-h-screen">
    <div className=" md:w-5/6 p-2 mx-auto flex flex-col items-center ">
      <h2 className="text-2xl font-bold mb-5 text-white">المخزون</h2>
      {products.length === 0 ? (
        <p className="text-lg font-bold mt-4 sm:mt-5 text-gray-200">لا توجد منتجات في المخزون</p>
      ) : (
        <>
          <table className="w-full border-collapse "dir="rtl">
            <thead className=" text-gray-200 ">
              <tr className="bg-slate-700 " >
                <th className="border p-2">اسم المنتج</th>
                <th className="border p-2">السعر</th>
                <th className="border p-2">العدد المتاح</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border  text-sky-100">
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
        <div className="flex gap-4 justify-center my-7">
          <Button title={"الذهاب للمشتريات "} width="md:w-40 w-32" handleClick={goToPurchaseInvoice}/>
          <Button title={"الذهاب للمبيعات"} width="md:w-40 w-32"  handleClick={ goToSalesInvoice}/>
        </div>
    </div>
    </div>
  );
};

export default Inventory;
