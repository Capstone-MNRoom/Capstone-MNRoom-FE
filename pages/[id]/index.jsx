import React, { Component, useEffect, useRef } from "react";
import BasicRating from "../../components/feedback";
import { TokenContext } from "../../utils/context";
import LoadingDots from "../../components/loading";
import { useState, useContext } from "react";
import Button from "../../components/button";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
// import DatePicker from '@mui/x-date-pickers-pro/DatePicker';
import CategoryIcon from "@mui/icons-material/Category";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import ChairIcon from "@mui/icons-material/Chair";
import SellIcon from "@mui/icons-material/Sell";
import TextField from "@mui/material/TextField";
import CastIcon from "@mui/icons-material/Cast";
import WifiIcon from "@mui/icons-material/Wifi";
import format from "../../utils/formatprice";

const Detail = (props) => {
  const [value, setValue] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);
  const ref = useRef(null);

  const [facility, setFacility] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  const router = useRouter();
  const [wrongInput, setWrongInput] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  // useEffect(() => {
  //   fetchFacility();
  //   fetchFeedback();
  // }, []);

  const fetchDatas = () => {
    fetchData();
    fetchData();
    fetchData();
    fetchData();
  };

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (router.query.id == undefined) {
      // return fetchData();
      return false;
    }

    console.log("ini router", router);

    fetch(
      `https://mnroom.capstone.my.id/rooms/${router.query.id || "10"}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        console.log("ini data", result.data);
      })
      .catch((error) => {
        if (error.status === 400) {
          navigate(`/detail/${router.query.id}/Not Found`);
        }
      })
      .finally(() => fetchFacility());
  };

  const fetchFacility = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://mnroom.capstone.my.id/rooms/${router.query.id || "10"}/facility`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setFacility(result.data);
        console.log("ini data fasility", result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => fetchFeedback());
  };

  const fetchFeedback = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://mnroom.capstone.my.id/feedbacks/${router.query.id || "10"}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setFeedback(result.data);
        // console.log("data ini adalah", result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccount({ ...account, [name]: value });
  };

  if (loading) {
    return <LoadingDots />;
  } else {
    return (
      <Layout>
        <div className="lg:mx-36 md:mx-28 mx-20 mb-10">
          <div className="font-bold text-4xl text-orange-500 pt-12 pb-3">
            <h1 id="hotel_name">{data.hotel_name}</h1>
          </div>
          <div className="flex text-xl">
            <PlaceIcon />
            <p id="address">&nbsp;{data.address},</p>
            <p id="city">&nbsp;{data.city}</p>
          </div>
        </div>
        <div className="lg:mx-48 md:mx-40 mx-32">
          <img id="image_room" src={data.image_room} />
        </div>
        <div className="flex justify-between my-12 mx-40">
          <div className="">
            <h3 id="room_name" className="text-2xl font-bold">
              {data.room_name}
            </h3>
            <div className="flex mt-4 mb-2 text-xl">
              <SellIcon />
              <p id="price">&nbsp;Rp {format(data.rental_price)} <span className="text-black/70 text-sm">/day</span></p>
            </div>
            <div className="flex mb-2 text-xl">
              <PersonIcon />
              <p id="capacity">&nbsp;{data.capacity}</p>
            </div>
            <div className="flex mb-2 text-xl">
              <CategoryIcon />
              <p id="category_id">&nbsp;{data.Categorys.category_name}</p>
            </div>
          </div>
          <div className="">
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
        <hr />
        <div className="font-bold ml-40 my-8 text-xl">
          <h3>Facility</h3>
        </div>
        <div className="container">
          {facility.map((item, index) => (
            <div key={index}>
              <div className="ml-40 text-lg mb-2">
                <div className="flex gap-4">
                  {item.Facilitys.id == 1 ? <TableRestaurantIcon /> : null}
                  {item.Facilitys.id == 2 ? <ChairIcon /> : null}
                  {item.Facilitys.id == 3 ? <FilterVintageIcon /> : null}
                  {item.Facilitys.id == 4 ? <BusinessCenterIcon /> : null}
                  {/* {item.Facilitys.id == 5 ? <LocalDiningIcon /> : null}
                  {item.Facilitys.id == 6 ? <CastIcon /> : null}
                  {item.Facilitys.id == 7 ? <AcUnitIcon /> : null}
                  {item.Facilitys.id == 8 ? <WifiIcon /> : null} */}
                  <p>{item.Facilitys.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="font-bold pl-36 pt-8 pb-8 text-xl">
          <h3>Feedback</h3>
        </div>
        <div className="flex">
          {feedback.map((item, index) => (
            <div key={index}>
              <BasicRating
                user={item.user}
                rating={item.rating}
                comment={item.comment}
              />
            </div>
          ))}
        </div> */}

        <div className="text-end my-14 mx-32">
          <Link href={`/${router.query.id}/form`}>
            <Button
              id="btn_order"
              className="w-1/3 bg-orange-500 border border-white hover:shadow-md hover:shadow-gray-400 text-lg font-bold py-2 px-2 mb-3 rounded-md text-white"
              label="Order"
              // onClick={() => handleOrder()}
            />
          </Link>
        </div>
      </Layout>
    );
  }
};

export default Detail;
