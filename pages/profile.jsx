import { useContext, useState, useEffect } from "react";
import { TokenContext } from "../utils/context";
import { Modal, Box } from "@mui/material";
import React, { Components } from "react";
import { useRouter } from "next/router";

import Loading from "../assets/loading-green-dots.json";
import Layout from "../components/Layout";
import Button from "../components/button";
import Input from "../components/input";
import Image from "next/image";
import Link from "next/link";

const Profile = (props) => {
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [Update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (token === "0") {
      router.push("/login");
    } else {
      fetchProfile();
    }
  }, []);

  const fetchProfile = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://mnroom.capstone.my.id/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setPhone(result.data.phone);
        setAddress(result.data.address);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setUpdate(false));
  };

  const handleName = (e) => {
    const inputName = e.target.value;
    setName(inputName);
    isNameError && setIsNameError(false);
  };

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    isEmailError && setIsEmailError(false);
  };

  const handlePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    isPasswordError && setIsPasswordError(false);
  };

  const handlePhone = (e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);
    isPhoneError && setIsPhoneError(false);
  };

  const handleAddress = (e) => {
    const inputAddress = e.target.value;
    setAddress(inputAddress);
    isAddressError && setIsAddressError(false);
  };

  const callUpdate = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  const callDelete = (e) => {
    setModal(true);
  };

  const handleDelete = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setUpdate(false));
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdate = () => {
    const regName = /^[a-zA-Z ]+$/g;
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gim;
    const regPhone = /^[0-9]{10,}$/;
    let passed = 0;

    if (regName.test(name)) {
      setIsNameError(false);
      passed++;
    } else {
      setIsNameError(true);
    }
    if (regEmail.test(email)) {
      setIsEmailError(false);
      passed++;
    } else {
      setIsEmailError(true);
    }
    if (regPhone.test(phone)) {
      setIsPhoneError(false);
      passed++;
    } else {
      setIsPhoneError(true);
    }
    if (address !== "") {
      passed = passed++;
    } else {
      setIsAddressError(true);
    }
    if (password !== "") {
      passed = passed++;
    } else {
      setIsPasswordError(true);
    }
    if (passed === 5) {
      setLoading(true);

      let myHeaders = new Headers();
      myHeaders.append(`Authorization`, `Bearer ${token}`);

      let formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);
      formdata.append("address", address);
      formdata.append("image", fileInput.files[0], image);

      let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`https://mnroom.capstone.my.id/users`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alert(result.message);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setLoading(false));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken("0");
    localStorage.removeItem("idUser");
    router.push("/login");
  };

  if (token !== "0") {
    if (loading) {
      return (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      );
    } else {
      return (
        <Layout>
          <div>
            <div className="text-center font-bold text-3xl text-orange-400 pt-12 pb-12">
              <h1>Profile</h1>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 text-center">
                  <div className="previewProfilePic">
                    <img className="playerProfilePic_home_tile" src={imgData} />
                  </div>
                  <Input
                    id="uploadPhoto"
                    type="file"
                    label=" "
                    multiple
                    name="image-upload"
                    className="rounded-full"
                    onChange={onChangePicture}
                  />
                </div>
                <div className="col-6">
                  <div className="border-slate-300">
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => handleName(e)}
                      label="Name"
                      value={name}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Name
                    </Input>
                  </div>
                  <br />
                  <div>
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => handleEmail(e)}
                      label="E-mail"
                      value={email}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Email
                    </Input>
                  </div>
                  <br />
                  <div>
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => handlePhone(e)}
                      label="Phone"
                      value={phone}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Phone Number
                    </Input>
                  </div>
                  <br />
                  <div>
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => handleAddress(e)}
                      label="Address"
                      value={address}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Address
                    </Input>
                  </div>
                  <br />
                </div>
              </div>
            </div>

            <div className="flex pl-72 pt-8 pb-12 gap-x-16">
              <Button
                className=" bg-orange-600 hover:bg-orange-400 font-bold py-2 px-5 rounded text-white"
                label="Update"
                onClick={() => handleUpdate()}
              />
              <Button
                className=" bg-orange-600 hover:bg-orange-400 font-bold py-2 px-5 rounded text-white"
                id="logout-button"
                onClick={() => handleLogOut()}
                // disabled={disabled}
                label="Log Out"
              />
            </div>

            <Modal open={modal} onClose={() => setModal(false)}>
              <Box className="w-1/3 min-h-1/2 translate-x-full translate-y-1/4  flex flex-col justify-center rounded-lg items-center shadow-2xl p-5 gap-3">
                <p className="text-4xl font-bold text-center my-5">
                  Are you sure to delete your account ?
                </p>
                <Button
                  className="bg-red-800 font-bold py-2 px-5 rounded text-black"
                  onClick={() => handleDelete()}
                >
                  Delete
                </Button>
              </Box>
            </Modal>
            <div className="pl-96 pb-6">
              <Button
                className="bg-rose-700 hover:bg-rose-400 font-bold py-2 px-4 rounded text-white"
                label="Delete Account"
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        </Layout>
      );
    }
  }
};

export default Profile;
