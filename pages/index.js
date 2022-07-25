// import Head from 'next/head'
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CardEvenList } from "../components/cards";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";

const Home = () => {

  // const [page, setPage] = useState(1);

  const [categories, setCategories] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };


  

  const getAllCategory = async () => {
    const res = await fetch(
      "https://mnroom.capstone.my.id/categorys",
      requestOptions
    );
    const response = await res.json();
    setCategories(response.data);
    setLoading(false);
  };

  const getCategory = async (id) => {
    const res = await fetch(
      `https://mnroom.capstone.my.id/rooms/category?category=${id}`,
      requestOptions
    );
    const response = await res.json();
    setData(response.data);
  };

  
const fetchAllData = async (page = 1) => {
    const res = await fetch(
      `https://mnroom.capstone.my.id/rooms?page=${page}`,
      requestOptions
    );
    const response = await res.json();
    console.log(response.data);
    console.log(response.data.length);
    setData(response.data);
    setLoading(false);
  };

  // const pageChangeHandler = (event, pageNumber = 1) => {
  //   // setPage(pageNumber.toString());
  //   fetchAllData();
  // };

  return (
    <>
      {loading && <div>Loading ....</div>}
      {!loading && (
        <div>
          <Layout>
            <div className="my-16">
              <div className="flex justify-evenly text-center items-center lg:flex-row md:flex-row flex-col text-orange-500 mt-5 lg:text-4xl md:text-3xl text-xl font-bold underline cursor-pointer">
                <a id="allroom" className="w-24" onClick={fetchAllData}>
                  All
                </a>
                {categories.map((category) => (
                  <a
                    id={category.category_name.toLowerCase()}
                    className="w-24"
                    key={category.id}
                    onClick={() => getCategory(category.id)}
                  >
                    {category.category_name}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:mx-24 md:mx-16 mx-6">
              {data.map((item) => (
                <CardEvenList
                  key={item.id}
                  id={item.id}
                  image={item.image_room}
                  title={item.room_name}
                  price={item.rental_price}
                  city={item.city}
                />
              ))}
            </div>
            <Stack spacing={2} className="flex items-center my-12">
              <Pagination
                size="large"
                count={10}
                onChange={(event, pageNumber) => fetchAllData(pageNumber)}
              />
            </Stack>
          </Layout>
        </div>
      )}
    </>
  );
};

export default Home;
