import React, { Component, useEffect, useRef } from "react";
import BasicRating from "../../components/feedback";
import { TokenContext } from "../../utils/context";
import LoadingDots from '../../components/loading';
import { useState, useContext } from "react";
import Button from "../../components/button";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from 'next/link';

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
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchFacility();
  //   fetchFeedback();
  // }, []);

  const fetchDatas = () => {
    fetchData();
    fetchData();
    fetchData();
    fetchData();
  }

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // console.log("ini router", router);

    if (router.query.id == undefined) {
      // return fetchData();
      return false
    }

    fetch(`https://mnroom.capstone.my.id/rooms/${router.query.id || '10'}`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setData(result.data);
        console.log("ini data", result.data)
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
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://mnroom.capstone.my.id/rooms/${router.query.id || '10'}/facility`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setFacility(result.data);
        console.log('ini data fasility', result.data);
      })
      .catch(error => console.log('error', error))
      .finally(() => fetchFeedback());
  };

  const fetchFeedback = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://mnroom.capstone.my.id/feedbacks/${router.query.id || '10'}`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setFeedback(result.data);
        // console.log("data ini adalah", result.data);
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccount({ ...account, [name]: value });
  }

  if (loading) {
    return <LoadingDots />;
  } else {
    return (
      <Layout>
        <div className="pl-8 pb-10">
          <div className="font-bold text-3xl text-orange-400 pt-12 pb-2">
            <h1>{data.hotel_name}</h1>
          </div>
          <div className="flex">
            <PlaceIcon />
            <p>{data.address}</p>
            <p>{data.city}</p>
          </div>
        </div>

        <div className='pl-14 pr-14'>
          <img src={data.image_room} />
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
                <p>{data.Categorys.category_name}</p>
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
            {facility.map((item, index) => (
              <div key={index}>
                <div className="col-6 pl-56 text-lg">
                  <div className="flex gap-4">
                    {item.Facilitys.id == 1 ? <TableRestaurantIcon /> : null}
                    {item.Facilitys.id == 2 ? <ChairIcon /> : null}
                    {item.Facilitys.id == 3 ? <FilterVintageIcon /> : null}
                    {item.Facilitys.id == 4 ? <BusinessCenterIcon /> : null}
                    {item.Facilitys.id == 5 ? <LocalDiningIcon /> : null}
                    {item.Facilitys.id == 6 ? <CastIcon /> : null}
                    {item.Facilitys.id == 7 ? <AcUnitIcon /> : null}
                    {item.Facilitys.id == 8 ? <WifiIcon /> : null}
                    <p>{item.Facilitys.name}</p>
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
          {feedback.map((item, index) => (
            <div key={index}>
              <BasicRating
                user={item.user}
                rating={item.rating}
                comment={item.comment}
              />
            </div>
          ))}
        </div>

        <div className="text-end pb-10">
          <Link href={`/${router.query.id}/form`}>
          <Button
            className=" bg-orange-600 hover:bg-orange-400 font-bold py-2 px-2 mb-3 rounded text-white"
            label="Order"
            // onClick={() => handleOrder()}            
          />
          </Link>
        </div>
      </Layout>
    );
  }
}

export default Detail;
