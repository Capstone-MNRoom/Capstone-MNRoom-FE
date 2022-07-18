import React, { useState } from "react";

import Image from "next/image";
import LOGO from "../assets/logo.png";
import Input from "../components/input";
import Button from "../components/Button";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

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
      <div className="w-full h-screen overflow-auto flex flex-col justify-center items-center bg-[#085E7D]">
        <h1 className="font-bold lg:text-5xl md:text-4xl text-3xl text-white mb-32">
          LOGIN
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-4 text-white flex flex-col w-1/2"
        >
          <Input
            className="bg-white/30 w-full"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="bg-white/30 w-full"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <Button
              className={`bg-[#E49318] text-white font-bold py-2 w-24 rounded-lg ${
                loading && "bg-orange-200 cursor-not-allowed"
              }`}
              id="btn-login"
              label="Login"
              loading={loading || disabled}
              type="submit"
            />
          </div>
          <h1 className="flex justify-center">or</h1>
          <a href={"/register"} className="underline flex justify-center">
            Create Account
          </a>
        </form>
      </div>
    </div>
  );
}
