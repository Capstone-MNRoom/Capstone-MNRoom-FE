import React from "react";

import Image from "next/image";
import LOGO from "../assets/logo.png";
import Input from "../components/input";
import Button from "../components/button";

export default function Register() {
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
        <div className="text-center font-bold text-3xl text-white">
          <span>SignUp</span>
        </div>
        <div className="flex flex-col p-16 justify-center">
          <Input label="Name" type="text" className="mb-4 bg-white" />
          <Input label="Email" type="email" className="mb-4 bg-white" />
          <Input label="Password" type="password" className="mb-4 bg-white" />
          <Input label="Phone" type="tel" className="mb-4 bg-white" />
          <Input label="Address" type="text" className="mb-10 bg-white" />
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
