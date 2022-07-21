import React from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import Photo from "../assets/foto-form.png";
import BCA from "../assets/bca.png";
import BRI from "../assets/bri.png";
import { useState } from "react";
import Inputan from "../../components/input";

const Form = () => {
  const [bank, setBank] = useState("");

  const [account, setAccount] = useState({
    startdate: "",
    enddate: "",
    reason: "",
    leavetype: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccount({ ...account, [name]: value });
  };

  const Submit = (e) => {
    e.preventDefault();
    console.log(account);
  };

  setBank = (e) => {
    console.log(e.target.value);
  };

  return (
    <Layout>
      <div className="text-center font-bold text-3xl text-orange-400 pt-12 pb-12">
        <h1>Form Rent Room</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Image src={Photo} />
          </div>
          <div className="col-6">
            <h3 className="text-3xl font-bold">Rahwana Room</h3>

            <p className="text-2xl">Rp 1.500.000</p>
            <br />
            <Inputan
              className="text-black form w-full input pb-2"
              onChange={(e) => handleChange(e)}
              label="Start Date"
              type="date"
              name="stardate"
              value=""
              min={new Date().toISOString().split("T")[0]}
              onKeyDown={(e) => Submit(e)}
              required
            />
            <Inputan
              className="text-black form w-full input pb-2"
              onChange={(e) => handleChange(e)}
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
                  <input type="radio" value="BRI" name="bank" />
                  <div className="w-16 h-16">
                    <Image src={BRI} />
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <input type="radio" value="BCA" name="bank" />
                  <div className="w-16 h-16">
                    <Image src={BCA} />
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Form;
