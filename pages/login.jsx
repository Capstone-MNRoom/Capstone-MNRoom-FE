import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { TokenContext } from "../utils/context";

import Image from "next/image";
import LOGO from "../assets/logo.png";
import Input from "../components/input";
import Button from "../components/button";

export default function Login() {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!token === "0") {
      router.push("/");
    }
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [token, email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const body = {
      email,
      password,
    };

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch("https://mnroom.capstone.my.id/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, data, token } = result;
        if (message === "success") {
          localStorage.setItem("token", token);
          setToken(token);
          router.push("/");
        }
        alert(message);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-screen flex lg:flex-row md:flex-row flex-col justify-center overflow-auto">
      <div className="w-full flex flex-col justify-center mt-28">
        <div className="text-center mr-6">
          <Image src={LOGO} />
        </div>
        <p className="text-center ml-2 mb-10 text-orange-500 font-bold">
          Trust is Only for The Chosen People
        </p>
      </div>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#085E7D]">
        <h1
          id="Login"
          className="font-bold lg:text-5xl md:text-4xl text-3xl text-orange-500 pb-14"
        >
          LOGIN
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-4 text-white flex flex-col lg:w-1/2 w-[80%]"
        >
          <Input
            id="loginEmail"
            className="bg-white rounded-md w-full"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="loginPassword"
            className="bg-white rounded-md w-full"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <Button
              className={`bg-orange-500 text-white font-bold py-2 w-24 hover:shadow-md hover:shadow-gray-700 rounded-lg ${
                loading && "bg-orange-200 cursor-not-allowed"
              }`}
              id="btnLogin"
              label="Login"
              loading={loading || disabled}
              type="submit"
            />
          </div>
          <h1 className="flex justify-center">or</h1>
          <a
            id="createAccount"
            href={"/register"}
            className="underline flex justify-center hover:text-orange-500"
          >
            Create Account
          </a>
        </form>
      </div>
    </div>
  );
}
