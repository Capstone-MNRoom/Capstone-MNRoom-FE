import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import Input from '../components/input';
import Layout from '../components/Layout';
import Button from '../components/button';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


function rating() {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [comment, setComment] = useState("");
    const [value, setValue] = useState(0);

    // useEffect(() => {
    //     if (!token === "0") {
    //         router.push("/");
    //     }
    //     if (name && date && address && price && quota && description && status) {
    //         setDisabled(false);
    //     } else {
    //         setDisabled(true);
    //     }
    // }, []
    // );

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const body = {
            comment,
            rating,
        };
        // var requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(body),
        // };
        // fetch("https://altaproject.online/events", requestOptions)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         const { message, data, token } = result;
        //         if (message === "success") {
        //             localStorage.setItem("token", token);
        //             setToken(token);
        //             router.push("/");
        //         }
        //         alert(message);
        //     })
        //     .catch((err) => {
        //         alert(err.toString());
        //     })
        //     .finally(() => setLoading(false));
    }

    return (
        <Layout>
            <div id='updateRoom' className='lg:text-4xl md:text-3xl text-2xl text-[#F97316] flex justify-center font-bold my-16'>Feedback</div>

            <div className='flex justify-center'>
                <div className='border shadow-md lg:w-[60%] md:w-[70%] w-[80%] mb-16 rounded-lg'>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className='my-16'>
                        <div className='space-y-3 flex flex-col w-[80%] m-auto'>
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                                className='flex justify-center mb-10 w-full'
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    size="large"
                                />
                            </Box>
                            <Input
                                id='commentFeedback'
                                type='text'
                                label='Comment'
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center mt-10'>
                            <Button
                                id="btnSubmitFeedback"
                                className={`bg-[#F97316] text-white font-bold py-2 px-14 border border-white rounded-lg hover:shadow-md hover:shadow-gray-400 ${loading && "bg-orange-200 cursor-not-allowed"
                                    }`}
                                label="Submit"
                                loading={loading || disabled}
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default rating