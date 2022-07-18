import React from "react";

import Image from "next/image";
import LOGO from "../assets/logo.png";
import Input from "../components/input";
import Button from "../components/Button";

export default function Login() {
  return (
    <div className="h-screen flex justify-center">
      <div className="w-full flex flex-col justify-center">
        <div className="text-center">
          <Image src={LOGO} />
        </div>
        <p className="text-center text-orange-400 font-bold">
          Trust is Only for The Chosen People
        </p>
      </div>
      <div className="w-full flex flex-col justify-center bg-[#085E7D] ">
        <h1 className="text-center font-bold text-3xl text-white">LOGIN</h1>
        <div className="flex flex-col p-32 justify-center">
          <Input label="email" type="email" className="mb-10 bg-white" />
          <Input label="password" type="password" className="mb-10 bg-white" />
          <div className=" text-center">
            <Button
              label="Login"
              className="bg-orange-500 rounded-md text-white px-8 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
