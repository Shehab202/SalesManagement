import React, { useState } from "react";
import { signIn } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    try {
      await signIn(email, password);
            toast.success("تم تسجيل الدخول بنجاح");

      navigate("/salesInvoice");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // console.log(email,password);
  return (
    <>
      <div className="w-full  bg-slate-800">
        <div className="">
        <form
          className=" h-screen flex flex-col gap-6 justify-center items-center"
          onSubmit={handleLogin}
        >
      
          <Input direction={true} type="email" setValue={setEmail} value={email} placeholder="Email" width="md:w-96 w-52" />
          <Input  direction={true} type="password" setValue={setPassword} value={password} placeholder="Password "width="md:w-96 w-52 " />
       
         <Button width="md:w-40 w-32" title="Login"/>
        </form>
        </div>
      </div>
      
    </>
  );
};
export default Login;
