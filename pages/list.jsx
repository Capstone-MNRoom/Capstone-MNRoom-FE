import { useState, useEffect, useContext } from "react";
import { CardEvenList } from "../components/cards";
import { TokenContext } from "../utils/context";
import LoadingDots from "../components/loading";
import Layout from "../components/Layout";
import Lottie from "react-lottie";
import Router from "next/router";
import React from "react";

const List = () => {

  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/users/rooms`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        alert(result.message);
      })
      .finally(() => setLoading(false));
  };

  const handleEdit = (id) => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let formdata = new FormData();
    formdata.append(`image_room`, fileInput.files[0], image_room);
    formdata.append(`image_pengelola`, fileInput.files[0], image_pengelola);

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/rooms/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Router.push(`/UpdateRoom/${id}`);
      })
      .catch((error) => {
        alert(result.message);
      })
      .finally(() => setLoading(false));
  };

  if (token !== "0") {
    if (loading) {
      return <LoadingDots />;
    } else {
      return (
        <Layout>
          <div className="text-center font-bold text-3xl text-orange-400 pt-12 pb-12">
            <h1>My Rooms</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:mx-24 md:mx-16 mx-6 mb-12">
            {data.map((item) => (
              <CardEvenList
                key={item.id}
                id={item.id}
                image={item.image_room}
                title={item.room_name}
                address={item.address}
                city={item.city}
                price={item.rental_price}
                edit={item.id}
                delete={item.id}
              />
            ))}
          </div>
        </Layout>
      );
    }
  } else {
    Router.push("/login");
  }
};

export default List;
