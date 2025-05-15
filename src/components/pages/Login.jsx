import React, { useState } from "react";
import { signIn } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      await signIn(email, password);
      navigate("/salesInvoice");
    } catch (error) {
      setError("البيانات غير صحيحة، حاول مرة أخرى");
    }
  };
  // console.log(email,password);
  return (
    <>
      <div className="w-full  bg-slate-900">
        <form
          className=" h-screen flex flex-col gap-6 justify-center items-center"
          onSubmit={handleLogin}
        >
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
          <Input type="email" setValue={setEmail} value={email} placeholder="Email" width="md:w-96 w-52" />
          <Input type="password" setValue={setPassword} value={password} placeholder="Password "width="md:w-96 w-52 " />
       
         <Button width="md:w-40 w-32" title="Login"/>
        </form>
      </div>
    </>
  );
};
export default Login;
