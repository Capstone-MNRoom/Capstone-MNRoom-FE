import React, { useEffect, useContext } from "react";
import { TokenContext } from "../../../utils/context";
import LoadingDots from "../../../components/loading";
import Button from "../../../components/button";
import Layout from "../../../components/Layout";
import Input from "../../../components/input";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// import Photo from '../assets/foto-form.png';
import BRI from "../../../assets/bri.png";
import BCA from "../../../assets/bca.png";

const Form = (props) => {
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);

  const [data, setData] = useState([]);
  const [account, setAccount] = useState({});
  const [startDate, setStartDate] = useState("10-12-2022");
  const [endDate, setEndDate] = useState("12-12-2022");
  const [item, setItem] = useState({});
  const [bank, setBank] = useState("BCA");
  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccount({ ...account, [name]: value });
  };

  const Submit = (e) => {
    e.preventDefault();
    console.log(account);
  };

  useEffect(() => {
    fetchData();
  }, []);

  setBank = (e) => {
    console.log(e.target.value);
  };

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);
    myHeaders.append(`Content-Type`, `application/json`);

    console.log("ini data di form", router);
    if (router.query.id == undefined) {
      // return fetchData();
      return false;
    }

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://mnroom.capstone.my.id/rents/${router.query.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        console.log("ini data get di form", result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  const handleConfirm = () => {
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
        console.log("ini data result".result.message);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  const handleStartDate = (e) => {
    const inputDate = e.target.value;
    setStartDate({ ...date, [e.target.name]: inputDate });
  };

  const handleEndDate = (e) => {
    const inputDate = e.target.value;
    setEndDate({ ...date, [e.target.name]: inputDate });
  };

  const handleBank = (e) => {
    const inputBank = e.target.value;
    setBank({ ...bank, [e.target.name]: inputBank });
  };

  if (token !== "0") {
    if (loading) {
      return <LoadingDots />;
    }
  } else {
    return (
      <Layout>
        <div className="text-center font-bold text-3xl text-orange-400 pt-12 pb-12">
          <h1>Form Rent Room</h1>
        </div>
        <div className="container">
          <div className="row">
            {/* {data.map((item, index) => (
              <div key={index}> */}
            <div className="col-6">
              <Image src={data.rooms.image_room} />
            </div>
            <div className="col-6">
              <h2 className="text-3xl font-bold">{data.rooms.hotel_name}</h2>
              <h3 className="text-3xl font-bold">{data.rooms.room_name}</h3>
              <p className="text-2xl">{data.total_rental_price}</p>
            </div>
            {/* </div>
            ))} */}
            <br />

            <Input
              shrink={true}
              className="text-black form w-full input pb-2"
              onChange={(e) => handleStartDate(e)}
              label="Start Date"
              type="date"
              name="stardate"
              value=""
              min={new Date().toISOString().split("T")[0]}
              onKeyDown={(e) => Submit(e)}
              required
            />
            <Input
              shrink={true}
              className="text-black form w-full input pb-2"
              onChange={(e) => handleEndDate(e)}
              label="End Date"
              type="date"
              name="enddate"
              disabled={account.startdate === "" ? true : false}
              min={
                account.startdate
                  ? new Date(account.startdate).toISOString().split("T")[0]
                  : ""
              }
              onKeyDown={(e) => Submit(e)}
              required
            />

            <br />

            <div className="flex">
              <p className="text-xl">Method Payment</p>
              <div onChange={setBank.bind(this)} className="flex gap-x-6 pl-6">
                <div className="flex gap-x-4">
                  <input
                    type="radio"
                    value="BRI"
                    name="bank"
                    onChange={(e) => handleConfirm(e)}
                  />
                  <div className="w-16 h-16">
                    <Image src={BRI} />
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <input
                    type="radio"
                    value="BCA"
                    name="bank"
                    onChange={(e) => handleConfirm(e)}
                  />
                  <div className="w-16 h-16">
                    <Image src={BCA} />
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div className="text-end pb-10">
              <Link href={`/${router.query.id}/payment`}>
                <Button
                  className=" bg-orange-600 hover:bg-orange-400 font-bold py-2 px-2 mb-3 rounded text-white"
                  label="Confirm"
                  onClick={() => handleConfirm()}
                />
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Form;
