import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import LOGO from "../assets/logo.png";
import Input from "../components/input";
import Button from "../components/Button";

function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (username && email && password && phone && address) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, email, password, phone, address]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const body = {
      username,
      email,
      password,
      phone,
      address,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(body),
      redirect: "follow",
      headers: headers,
    };

    const url = "https://mnroom.capstone.my.id/signup";
    fetch(url, requestOptions)
      .then((response) => {
        const { data } = response;
        response.json();
        if (response.status == 200) {
          alert("Registrasion Success");
          router.push("/login");
        }
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

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
        <h1 className="font-bold lg:text-5xl md:text-4xl text-3xl text-white pb-14">
          Sign Up
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-4 text-white flex flex-col w-1/2"
        >
          <Input
            className="bg-white/30 w-full"
            type="text"
            label="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            className="bg-white/30 w-full"
            type="email"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="bg-white/30 w-full"
            type="password"
            label="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            className="bg-white/30 w-full"
            type="tel"
            label="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            className="bg-white/30 w-full"
            type="text"
            label="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex justify-center">
            <Button
              className={`bg-[#E49318] text-white font-bold py-2 w-24 rounded-lg ${
                loading && "bg-orange-200 cursor-not-allowed"
              }`}
              id="btn-signup"
              label="Signup"
              loading={loading || disabled}
              type="submit"
            />
          </div>
          <h1 className="flex justify-center">or</h1>
          <a href={"/login"} className="underline flex justify-center">
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default Register;
