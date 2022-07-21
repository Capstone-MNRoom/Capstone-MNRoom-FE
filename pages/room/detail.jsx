import React, { Component, useEffect, useRef } from "react";
import BasicRating from "../../components/feedback";
import { TokenContext } from "../../utils/context";
import { useState, useContext } from "react";
import Button from "../../components/button";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CategoryIcon from "@mui/icons-material/Category";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import ChairIcon from "@mui/icons-material/Chair";
import StarIcon from "@mui/icons-material/Star";
import SellIcon from "@mui/icons-material/Sell";
import TextField from "@mui/material/TextField";
import CastIcon from "@mui/icons-material/Cast";
import WifiIcon from "@mui/icons-material/Wifi";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const Detail = (id) => {
  const [value, setValue] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);
  const ref = useRef(null);

  const [facility, setFacility] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = (id) => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/rooms/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        if (error.status === 400) {
          router.push(`/detail/${id}/Not Found`);
        }
      })
      .finally(() => fetchFacility([]));
  };

  //get date from server

  const fetchFacility = (id) => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/rooms/${id}/facility`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFacility(result.data);
      })
      .catch((error) => {
        if (error.status === 400) {
          navigate(`/detail/${id}/Not Found`);
        }
      })
      .finally(() => fetchFeedback([]));
  };

  const fetchFeedback = (id) => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/feedbacks/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFeedback(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const handleOrder = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);
    myHeaders.append(`Content-Type`, `application/json`);

    let raw = JSON.stringify({
      rooms_id: 10,
      date_start: "16-07-2022",
      date_end: "18-07-2022",
      bank: "BCA",
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://mnroom.capstone.my.id/rents", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  return (
    <Layout>
      <div className="pl-8 pb-10">
        <div className="font-bold text-3xl text-orange-400 pt-12 pb-2">
          <h1>{data.hotel_name}</h1>
        </div>
        <div className="flex">
          <PlaceIcon />
          <p>{data.address}</p>
        </div>
      </div>

      <div className="pl-14 pr-14">
        <Image src={data.image_room} />
      </div>
      <hr />
      <div className="container ">
        <div className="row">
          <div className="col-6 pl-32 pt-8 pb-4">
            <h3 className="text-2xl font-bold">{data.room_name}</h3>
            <div className="flex pt-4 pb-3 text-lg">
              <SellIcon />
              <p>Rp {data.rental_price} / day</p>
            </div>
            <div className="flex text-lg">
              <PersonIcon />
              <p>{data.capacity}</p>
            </div>
            <div className="flex text-lg">
              <CategoryIcon />
              <p>{data.categorys}</p>
            </div>
          </div>
          <div className="col-6 ">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="year"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <hr />

      <div className="font-bold pl-36 pt-8 pb-8 text-xl">
        <h3>Facility</h3>
      </div>
      <div className="container">
        <div className="row">
          {facility.map((facility, index) => (
            <div key={index}>
              <div className="col-6 pl-56 text-lg">
                <div className="flex">
                  <LocalDiningIcon />
                  <p>{facility.catering}</p>
                </div>
                <div className="flex pt-4">
                  <FilterVintageIcon />
                  <p>{facility.decoration}</p>
                </div>
                <div className="flex pt-4">
                  <BusinessCenterIcon />
                  <p>{facility.stuff}</p>
                </div>
                <div className="flex pt-4">
                  <ChairIcon />
                  <p>{facility.chairs}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="flex">
                  <TableRestaurantIcon />
                  <p>{facility.tables}</p>
                </div>
                <div className="flex pt-4">
                  <CastIcon />
                  <p>{facility.proyector}</p>
                </div>
                <div className="flex pt-4">
                  <AcUnitIcon />
                  <p>{facility.ac}</p>
                </div>
                <div className="flex pt-4">
                  <WifiIcon />
                  <p>{facility.wifi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="font-bold pl-36 pt-8 pb-8 text-xl">
        <h3>Feedback</h3>
      </div>
      <div className="flex">
        {feedback.map((feedback, index) => (
          <div key={index}>
            <BasicRating
              user={feedback.user}
              rating={feedback.rating}
              comment={feedback.comment}
            />
          </div>
        ))}
      </div>

      <div className="text-end pb-10">
        <Button
          className=" bg-orange-600 hover:bg-orange-400 font-bold py-2 px-2 mb-3 rounded text-white"
          label="Order"
          onClick={() => handleOrder()}
        />
      </div>
    </Layout>
  );
};

export default Detail;
