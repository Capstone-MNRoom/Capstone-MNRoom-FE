import React, { useEffect, useState, useContext } from "react";
import Button from "../../components/button";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { TokenContext } from "../../utils/context";
import format from "../../utils/formatprice";

function confirmpayment() {
  const router = useRouter();
  const { token } = useContext(TokenContext);
  const [rentData, setRentData] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/payments`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const allData = result.data;
        const findData = allData.find(
          (obj) => obj.id === parseInt(router.query.id)
        );
        setRentData(findData);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Layout>
      <div className="text-4xl text-[#F97316] flex justify-center font-bold my-16">
        Confirmation Payment
      </div>
      <div className="flex justify-center mb-24">
        <div className="border w-[40%] h-full rounded-lg shadow-md space-y-3 py-10 pl-20">
          {/* <div>
            <h1 className="font-bold my-1">Ruang Rahwana</h1>
            <p>Kota Malang, Jawa Timur, Indonesia</p>
          </div> */}
          <div>
            <h1 className="font-bold my-1">Transacsion Status</h1>
            {<p id="transactionStatus">{rentData.transaction_status}</p>}
            {/* <p>
              Start: {rentData.data.Rents[date_start]}
              <span>- End:{rentData.data.Rents[date_end]} </span>
            </p> */}
          </div>
          <div>
            <h1 className="font-bold my-1">No Order</h1>
            <p id="order_id">{rentData.order_id}</p>
          </div>
          <div>
            <h1 className="font-bold my-1">Payment type</h1>
            <p id="order_id">{rentData.payment_type}</p>
          </div>
          <div>
            <h1 className="font-bold my-1">Bank</h1>
            <p>Bank {rentData.bank_transfer}</p>
          </div>
          <div>
            <h1 className="font-bold my-1">No Virtual Account</h1>
            <p>{rentData.va_number}</p>
          </div>
          <div>
            <h1 className="font-bold my-1">Total Payment</h1>
            <p>Rp. {format(rentData.gross_amount)}</p>
          </div>

          <div className="pt-8 flex justify-end pr-20">
            <Button
              id="btn-confirm-payment"
              label="Confirm"
              // loading={loading || disabled}
              className={
                "bg-[#F97316] text-white font-bold py-2 px-14 border border-white rounded-lg shadow-md shadow-gray-300"
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default confirmpayment;
