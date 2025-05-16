import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SalesInvoice = () => {
  const navigate = useNavigate();
  const goToInventory = () => {
    navigate("/inventory");
  };
  const goToPurchaseInvoice = () => {
    navigate("/purchaseInvoice");
  };

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");

  const calculateTotal = () => {
    const p = parseFloat(price) || 0;
    const q = parseInt(quantity) || 0;
    const d = parseFloat(discount) || 0;
    const totalBeforeDiscount = p * q;
    const discountAmount = (totalBeforeDiscount * d) / 100;
    return totalBeforeDiscount - discountAmount;
  };
  const handleAddInvoice = async (e) => {
    e.preventDefault();
    if (!productName || !price || !quantity) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    if (parseFloat(price) <= 0 || parseInt(quantity) <= 0) {
      toast.error("السعر والكمية يجب ان تكون اكبر من صفر");
      return;
    }
    try {
      const productsRef = doc(db, "inventory", productName);
      const productSnap = await getDoc(productsRef);

      if (!productSnap.exists()) {
        toast.error("المنتج غير موجود في المخزون");
        return;
      }
      const availableQuantity = productSnap.data().quantity;
      if (availableQuantity < parseInt(quantity)) {
        toast.error("الكمية المطلوبة غير متاحة في المخزون");
        return;
      }

      await updateDoc(productsRef, {
        quantity: availableQuantity - parseInt(quantity),
        price: parseFloat(price),
      });

      await addDoc(collection(db, "salesInvoices"), {
        productName,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        discount: parseFloat(discount) || 0,
        total: calculateTotal(),
        createdAt: Timestamp.now(),
      });

      setProductName("");
      setPrice("");
      setQuantity("");
      setDiscount("");
      toast.success("تم إضافة الفاتورة بنجاح");
    } catch (error) {
      toast.error("حدث خطأ، حاول مرة أخرى");
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-slate-900 ">
      <div>
        <form
          onSubmit={handleAddInvoice}
          className="flex flex-col gap-6 justify-center items-center h-full "
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-200">
            فاتورة المبيعات
          </h2>

          <Input
            value={productName}
            setValue={setProductName}
            placeholder="اسم المنتج"
            width="md:w-3/6 w-2/6"
            type={"text"}
          />
          <Input
            value={price}
            setValue={setPrice}
            placeholder=" سعر المنتج"
            width="md:w-3/6 w-2/6"
            type={"number"}
          />
          <Input
            value={quantity}
            setValue={setQuantity}
            placeholder="الكمية"
            width="md:w-3/6 w-2/6"
            type={"number"}
          />
          <div className="flex gap-4 md:w-3/6 w-2/6 ">
            <Input
              value={discount}
              setValue={setDiscount}
              placeholder=" %نسبة الخصم"
              width="md:w-3/6 w-2/6"
              type={"number"}
            />
            <p className="text-amber-200 font-bold text-center  bg-slate-800 border border-slate-600 rounded-lg py-1 w-2/6">
              {calculateTotal()}
            </p>
          </div>
          <Button title={"اضافة الفاتورة"} width="md:w-40 w-32" />
        </form>
        <div className="flex gap-4 justify-center my-7">
          <Button
            title={"الذهاب للمخزون "}
            width="md:w-40 w-32"
            handleClick={goToInventory}
          />
          <Button
            title={"الذهاب للمشتريات"}
            width="md:w-40 w-32"
            handleClick={goToPurchaseInvoice}
          />
        </div>
      </div>
    </div>
  );
};
export default SalesInvoice;
