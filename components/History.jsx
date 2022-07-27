import React from "react";

import { useRouter } from "next/router";
import router from "next/router";
import Button from "../components/button";

const CardHistory = (props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: `/rating/${props.id}`,
      query: { roomId: props.roomId },
    });
  };

  return (
    <div>
      <div className="mb-auto">
        <div className="w-full overflow-auto text-[#085E7D] font-bold flex justify-evenly">
          <div>
            <div>
              <span>{props.roomName}</span>
            </div>
            <div>
              <div>Date and Time</div>
              <div className="flex font-thin">
                <div>Start: {props.dateStart}</div>
                <div>End: {props.dateEnd}</div>
              </div>
            </div>
            <div>
              <div>Total Price</div>
              <div className="font-thin">Rp. {props.grossAmount}</div>
            </div>
          </div>
          <div>
            <div className=" flex flex-col items-center p-16">
              <Button
                id="feedback_id"
                label="feedback"
                className="bg-orange-500 rounded-md text-white px-8 py-1 mt-8"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
