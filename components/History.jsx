import React from 'react';
import format from "../utils/formatprice";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import Button from "../components/button";

const History = (props) => {

  return (
        <div className="w-full overflow-auto text-[#085E7D] font-bold flex justify-evenly">
          <div>
            <div>
              <span>{props.title}</span>
            </div>
            <div className="mt-1">
              <div>Location</div>
              <div className="font-thin">
                {props.city}
              </div>
            </div>
            <div>
              <div>Date and Time</div>
              <div className="flex font-thin">
                <div>Start: {props.start}</div>
                <div>End: {props.end}</div>
              </div>
            </div>
            <div>
              <div>Total Price</div>
              <div className="font-thin">Rp {format(props.price)}</div>
            </div>
          </div>
          <div>
            <div className=" flex flex-col items-center p-16">
            {props.icon && (
              <DoneOutlineRoundedIcon />
            )}
            {props.button && (
              <Button
		id="btnFeedback"
                label="feedback"
                className="bg-orange-500 rounded-md text-white px-8 py-1 mt-8"
              />
            )}
            </div>
          </div>
        </div>
  )
}

export default History