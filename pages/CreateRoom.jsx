import { useEffect, useContext, useState } from "react";
import { TokenContext } from "../utils/context";
import Layout from "../components/Layout";
import Button from "../components/button";
import Room from '../assets/room.png';
import Input from "../components/input";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function createroom() {

  const { token, setToken } = useContext(TokenContext);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [objSubmit, setObjSubmit] = useState("");
  const [nameHotel, setNameHotel] = useState("");
  const [nameRoom, setNameRoom] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [facility, setFacility] = useState([]);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    handleCategories();
  }, []);

  useEffect(() => {
    handlefacilities();
  }, []);

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
      category &&
      facility
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameRoom, price, capacity, nameHotel, city, address, category, facility]);

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

  const handlefacilities = async () => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      "https://mnroom.capstone.my.id/facilitys",
      requestOptions
    );
    const response = await res.json();
    setFacilities(response.data);
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
    for (let i = 0; i < facility.length; i++) {
      formdata.append("facilitys", facility[i].id);
    }
    formdata.append("image_room", picture);
    formdata.append("categorys_id", parseInt(category));

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };

    fetch("https://mnroom.capstone.my.id/rooms", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, status } = result;
        if (status === "success") {
          router.push("/");
        }
        alert(message);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
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

  const handleMultySelect = (event) => {
    const {
      target: { value },
    } = event;
    setFacility(value);
    const selectedFacilitys = value.map((item) => item.id);
  };

  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Layout>
      <div className='w-full h-full text-left -ml-10 -mt-36 -mb-8'>
        <Image width={600} height={300} src={Room}/>
      </div>
      <div
        id="createRoom"
        className="lg:text-4xl md:text-3xl text-2xl text-[#F97316] flex justify-center font-bold lg:my-16 md:my-15 my-10"
      >
        Create Room
      </div>

      <div className="flex justify-center">
        <div className="border shadow-md lg:w-[60%] md:w-[70%] w-[90%] mb-16 rounded-lg">
          <form onSubmit={(e) => handleSubmit(e)} className="lg:my-16 md:my-15 my-10">
            <div className="space-y-3 flex flex-col lg:w-[80%] md:w-[80%] w-[90%] m-auto">
              <Input
                id="createRoomName"
                type="text"
                label="Name Room"
                onChange={(e) => setNameRoom(e.target.value)}
              />
              <Input
                id="createRoomPrice"
                type="text"
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                id="createRoomCapacity"
                type="text"
                label="Capacity"
                onChange={(e) => setCapacity(e.target.value)}
              />
              <Input
                id="createHotelName"
                type="text"
                label="Name Hotel"
                onChange={(e) => setNameHotel(e.target.value)}
              />
              <Input
                id="createHotelCity"
                type="text"
                label="City"
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                id="createHotelAddress"
                type="text"
                label="Address"
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
              <FormControl>
                <InputLabel>Facility</InputLabel>
                <Select
                  id="dropdownFacility"
                  multiple
                  value={facility}
                  onChange={handleMultySelect}
                  input={<OutlinedInput label="Facility" />}
                  renderValue={(selected) =>
                    selected.map((select) => select.name).join(", ")
                  }
                  MenuProps={MenuProps}
                >
                  {facilities &&
                    facilities.map((item) => (
                      <MenuItem key={item.id} value={item}>
                        <Checkbox checked={facility.indexOf(item) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                </Select>
                <Input
                  id="uploadPhoto"
                  type="file"
                  label=" "
                  multiple
                  name="image-upload"
                  className="rounded-full mt-3"
                  onChange={onChangePicture}
                />
                <div className="previewProfilePic">
                  <img
                    className="playerProfilePic_home_tile mt-3"
                    src={imgData}
                  />
                </div>
              </FormControl>
            </div>
            <div className="flex justify-center mt-10">
              <Button
                id="btnCreateRoom"
                className={`bg-[#F97316] text-white font-bold py-2 px-14 border border-white rounded-lg hover:shadow-md hover:shadow-gray-400 ${
                  loading && "bg-orange-200 cursor-not-allowed"
                }`}
                label="Create"
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

export default createroom;
