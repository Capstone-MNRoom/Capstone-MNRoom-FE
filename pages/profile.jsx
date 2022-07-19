import React, { Components } from 'react'
import Layout from "../components/Layout"
import Button from '../components/button'
import { Modal, Box } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { TokenContext } from "../utils/context";
import Link from 'next/link'
import Image from 'next/image'
import Input from '../components/input'
import Photo from '../assets/foto-form.png'

const Profile = () => {

    const { token, setToken } = useContext(TokenContext);

    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [isAddressError, setIsAddressError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    // useEffect(() => {
    //     if (token === "0") {
    //         navigate("/login");
    //     } else {
    //         fetchProfile();
    //     }
    // }, []);

    const fetchProfile = () => { }

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

    const callSubmit = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = async () => { }

    const callDelete = (e) => {
        setModal(true);
    };

    const handleDelete = () => { }

    const handleUpdate = () => { }

    const handleUpload = () => { }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        setToken("0");
        localStorage.removeItem("idUser");
        navigate("/login");
    };

    token= "1"

    if (token !== "0") {
        if (loading) {
            return (
                <div className="h-screen w-screen flex justify-center items-center">
                    {/* <div className="h-36 w-36 animate-loading"></div> */}
                </div>
            );
        } else {
            return (
                <Layout>
                    <div>
                        <div className='text-center font-bold text-3xl text-orange-400 pt-12 pb-12'>
                            <h1>
                                Profile
                            </h1>
                        </div>

                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 '>
                                    <Image src={Photo} className='rounded-full' />
                                </div>
                                <div className='col-6'>
                                    <div className="border-slate-300">
                                        <Input
                                            className="text-white form w-full input pb-2"
                                            onChange={(e) => handleName(e)}
                                            label="Name"
                                            value={name}
                                            onKeyDown={(e) => callSubmit(e)}
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
                                            onKeyDown={(e) => callSubmit(e)}
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
                                            onKeyDown={(e) => callSubmit(e)}
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
                                            onKeyDown={(e) => callSubmit(e)}
                                        >
                                            Address
                                        </Input>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>

                        <div className='flex pl-72 pt-8 pb-12 gap-x-16'>
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
                        <div className='pl-96 pb-6'>
                        <Button
                            className="bg-rose-700 hover:bg-rose-400 font-bold py-2 px-4 rounded text-white"
                            label="Delete Account"
                            onClick={() => handleDelete()}
                        />
                        </div>
                    </div>

                </Layout>
            )
        }

    }
}

export default Profile;
