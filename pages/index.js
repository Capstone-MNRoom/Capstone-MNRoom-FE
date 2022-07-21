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

import { CardEvenList } from "../components/cards";
import Layout from "../components/Layout";
import Category from "../components/Category";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchAllData = async () => {
    const res = await fetch(
      "https://mnroom.capstone.my.id/rooms",
      requestOptions
    );
    const response = await res.json();
    setData(response.data);
    console.log(data);
    setLoading(false);
  };

  return (
    <>
      {loading && <div>Loading ....</div>}
      {!loading && (
        <div>
          <Layout>
            <Category />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
            ;
          </Layout>
          ;
        </div>
      )}
    </>
  );
};

export default Home;
