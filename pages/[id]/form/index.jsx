import { TokenContext } from "../../../utils/context";
import LoadingDots from "../../../components/loading";
import React, { useEffect, useContext } from "react";
import Button from "../../../components/button";
import Layout from "../../../components/Layout";
import Input from "../../../components/input";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

import format from "../../../utils/formatprice";
import BNI from "../../../assets/bni.png";
import BCA from "../../../assets/bca.png";

const Form = (props) => {
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [account, setAccount] = useState({});
  const [bank, setBank] = useState("BCA");
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  setBank = (e) => {
    console.log(e.target.value);
  };

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://mnroom.capstone.my.id/rooms/${router.query.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  const handleConfirm = () => {
    var moment = require("moment");
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);
    myHeaders.append(`Content-Type`, `application/json`);

    let raw = JSON.stringify({
      rooms_id: parseInt(router.query.id),
      date_start: startDate,
      date_end: endDate,
      bank: bank,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://mnroom.capstone.my.id/rents", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        router.push(`/confirmpayment/${result.data.id}`);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  // const handleBank = (e) => {
  //   const inputBank = e.target.value;
  //   setBank({ ...bank, [e.target.name]: inputBank });
  // };

  if (token !== "0") {
    if (loading) {
      return <LoadingDots />;
    } else {
      return (
        <Layout>
          <div className="text-center font-bold text-3xl text-orange-400 pt-12 pb-12">
            <h1>Form Rent Room</h1>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img id="image_room" src={data.image_room} />
              </div>
              <div className="col-6">
                <h2 id="hotel_name" className="text-3xl font-bold">
                  {data.hotel_name}
                </h2>
                <h3 id="room_name" className="text-3xl text-base font-medium">
                  {data.room_name}
                </h3>
                <p id="rental_price" className="text-2xl">
                  {format(data.rental_price)}
                </p>
                <br />
                <Input
                  id="start_date"
                  shrink={true}
                  className="text-black form w-full input pb-2"
                  onChange={(e) => setStartDate(e.target.value)}
                  label="Start Date"
                  type="date"
                  name="stardate"
                  required
                />
                <Input
                  id="end_date"
                  shrink={true}
                  className="text-black form w-full input pb-2"
                  onChange={(e) => setEndDate(e.target.value)}
                  label="End Date"
                  type="date"
                  name="enddate"
                  disabled={account.startdate === "" ? true : false}
                  required
                />
                <br />
                <div className="flex">
                  <p className="text-xl">Method Payment</p>
                  <div
                    id="bank_id"
                    onChange={setBank.bind(this)}
                    className="flex gap-x-6 pl-6"
                  >
                    <div className="flex gap-x-4">
                      <input type="radio" value="BNI" name="bank" />
                      <div className="w-16 h-16">
                        <Image id="bni_radio" src={BNI} />
                      </div>
                    </div>
                    <div className="flex gap-x-4">
                      <input type="radio" value="BCA" name="bank" />
                      <div className="w-16 h-16">
                        <Image id="bca_radio" src={BCA} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />

              <div className="text-end pb-10">
                <Button
                  id="btn_rent"
                  className=" bg-orange-600 hover:bg-orange-400 font-bold py-2 px-2 mb-3 rounded text-white"
                  label="Confirm"
                  onClick={() => handleConfirm()}
                />
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  }
};

export default Form;
