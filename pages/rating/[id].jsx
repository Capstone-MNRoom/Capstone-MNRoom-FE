import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { TokenContext } from "../../utils/context";
import { useRouter } from "next/router";

import Input from "../../components/input";
import Layout from "../../components/Layout";
import Button from "../../components/button";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

function rating() {
  const { token, setToken } = useContext(TokenContext);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!token === "0") {
      router.push("/");
    }
    if (rating && comment) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [rating, comment]);

  // useEffect(() => {
  //   handleChange();
  // }, []);

  const handleChange = (e) => {
    setRating(parseInt(e.target.value));
    setValue(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      rents_id: parseInt(router.query.id),
      comment,
      rating,
    };

    console.log(body);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    fetch(`https://mnroom.capstone.my.id/feedbacks`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, status } = result;
        alert(message);
        router.push(`/${router.query.roomId}`);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div
        id="updateRoom"
        className="lg:text-4xl md:text-3xl text-2xl text-[#F97316] flex justify-center font-bold my-16"
      >
        Feedback
      </div>

      <div className="flex justify-center">
        <div className="border shadow-md lg:w-[60%] md:w-[70%] w-[80%] mb-16 rounded-lg">
          <form onSubmit={(e) => handleSubmit(e)} className="my-16">
            <div className="space-y-3 flex flex-col w-[80%] m-auto">
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
                className="flex justify-center mb-10 w-full"
              >
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(e) => handleChange(e)}
                  size="large"
                />
              </Box>
              <Input
                id="commentFeedback"
                type="text"
                label="Comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-10">
              <Button
                id="btnSubmitFeedback"
                className={`bg-[#F97316] text-white font-bold py-2 px-14 border border-white rounded-lg hover:shadow-md hover:shadow-gray-400 ${
                  loading && "bg-orange-200 cursor-not-allowed"
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
  );
}

export default rating;
