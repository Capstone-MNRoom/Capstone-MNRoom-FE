import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../utils/context";
import LoadingDots from "../../components/loading";
import Router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Button from "../../components/button";
import format from "../../utils/formatprice";
import Input from "../../components/input";
import Room from "../../assets/room.png";
import Image from "next/image";
import React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";

function updateroom() {
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [categories, setCategories] = useState([]);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [data, setData] = useState([]);
  const [nameRoom, setNameRoom] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [nameHotel, setNameHotel] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (token === "0") {
      router.push("/");
    }
    if (
      nameRoom &&
      price &&
      capacity &&
      nameHotel &&
      city &&
      address &&
      category
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameRoom, price, capacity, nameHotel, city, address, category]);

  useEffect(() => {
    handleCategories();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    getUpdateData();
  }, [router.isReady]);

  const handleCategories = async () => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      "https://mnroom.capstone.my.id/categorys",
      requestOptions
    );
    const response = await res.json();
    setCategories(response.data);
  };

  const getUpdateData = async () => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `https://mnroom.capstone.my.id/rooms/${router.query.id}`,
      requestOptions
    );
    const response = await res.json();
    const updateData = response.data;
    setNameRoom(updateData.room_name);
    setPrice(updateData.rental_price);
    setCapacity(updateData.capacity);
    setNameHotel(updateData.hotel_name);
    setCity(updateData.city);
    setAddress(updateData.address);
    setImgData(updateData.image_room);
    setCategory(updateData.Categorys.id);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("room_name", nameRoom);
    formdata.append("capacity", parseInt(capacity));
    formdata.append("hotel_name", nameHotel);
    formdata.append("rental_price", parseInt(price));
    formdata.append("address", address);
    formdata.append("city", city);
    formdata.append("image_room", picture);
    formdata.append("categorys_id", parseInt(category));

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `https://mnroom.capstone.my.id/rooms/${router.query.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { message, status } = result;
        if (status === "success") {
          router.push(`/${router.query.id}`);
        }
        alert(message);
      })
      .catch((err) => {
        alert(err.toString());
      });
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  if (loading) {
    return <LoadingDots />;
  } else {
    return (
      <Layout>
        <div className="w-full h-full text-left -ml-10 -mt-36 -mb-8">
          <Image width={600} height={300} src={Room} />
        </div>
        <div
          id="updateRoom"
          className="lg:text-4xl md:text-3xl text-2xl text-[#F97316] flex justify-center font-bold lg:my-16 md:my-15 my-10"
        >
          Update Room
        </div>
        <div className="flex justify-center">
          <div className="border shadow-md lg:w-[60%] md:w-[70%] w-[90%] mb-16 rounded-lg">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="lg:my-16 md:my-15 my-10"
            >
              <div className="space-y-3 flex flex-col lg:w-[80%] md:w-[80%] w-[90%] m-auto">
                <Input
                  id="updateRoomName"
                  type="text"
                  label="Name Room"
                  value={nameRoom}
                  onChange={(e) => setNameRoom(e.target.value)}
                />
                <Input
                  id="updateRoomPrice"
                  type="text"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                  id="updateRoomCapacity"
                  type="text"
                  label="Capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
                <Input
                  id="updateHotelName"
                  type="text"
                  label="Name Hotel"
                  value={nameHotel}
                  onChange={(e) => setNameHotel(e.target.value)}
                />
                <Input
                  id="updateHotelCity"
                  type="text"
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  id="updateHotelAddress"
                  type="text"
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    id="dropdownCategory"
                    value={category}
                    label="Category"
                    onChange={handleSelect}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Input
                  id="uploadPhoto"
                  type="file"
                  label=" "
                  name="image-upload"
                  onChange={onChangePicture}
                />
              </div>
              <div className="previewProfilePic">
                <img
                  id="previewPhoto"
                  className="playerProfilePic_home_tile mt-3"
                  src={imgData}
                />
              </div>
              <div className="flex justify-center mt-10">
                <Button
                  id="btnUpdateRoom"
                  className={`bg-[#F97316] text-white font-bold py-2 px-14 border border-white rounded-lg hover:shadow-md hover:shadow-gray-400 ${
                    loading && "bg-orange-200 cursor-not-allowed"
                  }`}
                  label="Update"
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
}

export default updateroom;
