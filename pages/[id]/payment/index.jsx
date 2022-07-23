import React from "react";
import Button from "../../../components/button";
import Layout from "../../../components/Layout";

function confirmpayment() {
  return (
    <Layout>
      <div className="text-4xl text-[#F97316] flex justify-center font-bold my-16">
        Confirmation Payment
      </div>

      <div className="flex justify-center mb-24">
        <div className="border w-[40%] h-full rounded-lg shadow-md space-y-3 py-10 pl-20">
          <div>
            <h1 className="font-bold my-1">Ruang Rahwana</h1>
            <p>Kota Malang, Jawa Timur, Indonesia</p>
          </div>
          <div>
            <h1 className="font-bold my-1">Date and Time</h1>
            <p>
              Start: 03-03-2023 <span>- End: 04-03-2023 </span>
            </p>
          </div>
          <div>
            <h1 className="font-bold my-1">No Order</h1>
            <p>2568000293</p>
          </div>
          <div>
            <h1 className="font-bold my-1">Payment type</h1>
            <p>Bank Transfer - Virtual Account</p>
          </div>
          <div>
            <h1 className="font-bold my-1">Bank</h1>
            <p>Bank BCA</p>
          </div>
          <div>
            <h1 className="font-bold my-1">No Virtual Account</h1>
            <p>884800000009572449</p>
          </div>
          <div>
            <h1 className="font-bold my-1">Total Payment</h1>
            <p>Rp. 3.000.000</p>
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
