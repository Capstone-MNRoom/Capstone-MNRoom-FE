import { useContext, useState, useEffect } from "react";
import { TokenContext } from "../utils/context";
import { Modal, Box } from "@mui/material";
import React, { Components } from "react";
import { useRouter } from "next/router";
import Room from "../assets/room.png";
import Image from "next/image";

import Loading from '../components/loading';
import Layout from "../components/Layout";
import Button from "../components/button";
import Input from "../components/input";
import Link from "next/link";

const Profile = (props) => {

  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [Update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [objUpdate, setObjUpdate] = useState('');
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [preview, setPreview] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");

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
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://mnroom.capstone.my.id/users/profile`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setUsername(result.data.username);
        setEmail(result.data.email);
        setPhone(result.data.phone);
        setAddress(result.data.address);
        setImgData(result.data.image);
        setImage(result.data.image);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('token expired please re-login')
          handleLogout()
        }
      })
      .finally(() => setLoading(false));
  }

  const handleChange = (value, key) => {
    let temp = { ...objUpdate };
    temp[key] = value;
    setObjUpdate(temp);
  };

  const handleUsername = (e) => {
    const inputUsername = e.target.value;
    setUsername(inputUsername);
    isUsernameError && setIsUsernameError(false);
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

  const handleUpdate = () => {
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regUsername = /^[a-z0-9_-]{3,16}$/igm;
    const regPhone = /^\d+$/
    let passed = 0;

    if (regUsername.test(username)) {
      setIsUsernameError(false);
      passed = passed + 1
    } else {
      setIsUsernameError(true);
    }
    if (regEmail.test(email)) {
      setIsEmailError(false);
      passed = passed + 1
    } else {
      setIsEmailError(true);
    }
    if (regPhone.test(phone)) {
      setIsPhoneError(false);
      passed = passed + 1
    } else {
      setIsPhoneError(true);
    }
    if (address !== "") {
      passed = passed + 1
    } else {
      setIsAddressError(true);
    }
    if (password !== "") {
      passed = passed + 1
    } else {
      setIsPasswordError(true);
    }
   
    setLoading(true);

    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let formdata = new FormData();
    for (const key in objUpdate) {
      formdata.append(key, objUpdate[key]);
    }

    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://mnroom.capstone.my.id/users", requestOptions)
      .then(response => response.json())
      .then((result) => {
        alert(result.message)
        setObjUpdate({});
      })
      .catch(error => {
        alert(result.message)
      })
      .finally(() => setLoading(false))
  }

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
        handleLogout();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          router.push("/login");
        } else {
          alert(error.message);
        }
      })
      .finally(() => setUpdate(false));
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
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
      return <Loading />;
    } else {
      return (
        <Layout>
          <div className='w-full h-full text-left -ml-10 -mt-36 -mb-8'>
            <Image width={600} height={300} src={Room}/>
          </div>
          <div>
            <div className="lg:text-4xl md:text-3xl text-2xl text-orange-500 flex justify-center font-bold lg:mb-20 md:mb-16 mb-10">
              <h1>Profile</h1>
            </div>
            <div className="container">
              <div className="flex w-full lg:flex-row md:flex-row flex-col">
                <div className="lg:w-[50%] md:w-[50%] w-[90%] text-center mb-10">
                  <div className="w-1/3 m-auto mb-4">
                    <img className="playerProfilePic_home_tile" src={imgData} />
                  </div>
                  <Input
                    id="uploadPhoto"
                    type="file"
                    label=" "
                    multiple
                    name="image-upload"
                    className="rounded-full"
                    onChange={(e) => { onChangePicture(e)
                      handleChange(e.target.files[0], "image") }}
                  />
                </div>
                <div className="lg:w-[50%] md:w-[50%] w-[90%] m-auto">
                  <div className="border-slate-300 w-[90%] space-y-3">
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => {
                        handleUsername(e)
                        handleChange(e.target.value, "username")
                      }}

                      label="Name"
                      value={username}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Username
                    </Input>
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => {
                        handleEmail(e)
                        handleChange(e.target.value, "email")
                      }}
                      label="E-mail"
                      value={email}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Email
                    </Input>
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => {
                        handlePhone(e)
                        handleChange(e.target.value, "phone")
                      }}
                      label="Phone"
                      value={phone}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Phone Number
                    </Input>
                    <Input
                      className="text-white form w-full input pb-2"
                      onChange={(e) => {
                        handleAddress(e)
                        handleChange(e.target.value, "address")
                      }}
                      label="Address"
                      value={address}
                      onKeyDown={(e) => callUpdate(e)}
                    >
                      Address
                    </Input>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10 mb-6 gap-x-10">
              <Button
                className=" bg-orange-500 border border-white hover:shadow-md hover:shadow-gray-400 font-bold py-2 px-5 rounded-md text-white"
                label="Update"
                onClick={() => handleUpdate()}
              />
              <Button
                className=" bg-orange-500 border border-white hover:shadow-md hover:shadow-gray-400 font-bold py-2 px-5 rounded-md text-white"
                id="logout-button"
                onClick={() => handleLogOut()}
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
            <div className="w-full text-center mb-16">
              <Link href='/login'>
                <Button
                  className="bg-rose-700 border border-white hover:shadow-md hover:shadow-gray-400 font-bold py-2 px-4 rounded-md text-white"
                  label="Delete Account"
                  onClick={() => handleDelete()}
                />
              </Link>
            </div>
          </div>
        </div>
        </Layout>
      );
    }
  }
};

export default Profile;