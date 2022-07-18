import React, { useState } from "react";

import Layaout from "../components/Layout";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import CustomButton from "../components/CustomButton";

function Historypayment() {
  const [loading, setLoading] = useState(false);
  return (
    <Layaout>
      <div className="mb-auto">
        <div className="text-center text-[#085E7D] text-5xl p-12 w-full">
          History Payment
        </div>
        <div className="w-full overflow-auto text-[#085E7D] font-bold flex justify-evenly">
          <div>
            <div>
              <span>Ruang Arjuna</span>
            </div>
            <div className="mt-1">
              <div>Location</div>
              <div className="font-thin">
                Kota Malang, Jawa Timur, Indonesia
              </div>
            </div>
            <div>
              <div>Date and Time</div>
              <div className="flex font-thin">
                <div>Start: 03-03-2023, 6am</div>
                <div>End: 04-03-2023, 12pm</div>
              </div>
            </div>
            <div>
              <div>Total Price</div>
              <div className="font-thin">100000</div>
            </div>
          </div>
          <div>
            <div className=" flex flex-col items-center p-16">
              <DoneOutlineRoundedIcon />
              <CustomButton
                label="feedback"
                className="bg-orange-500 rounded-md text-white px-8 py-1 mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </Layaout>
  );
}
export default Historypayment;
