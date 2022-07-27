import React, { useEffect, useState, useContext } from "react";

import { TokenContext } from "../utils/context";

import Layaout from "../components/Layout";
import CardHistory from "../components/History";
import format from "../utils/formatprice";

function Historypayment() {
  const [history, setHistory] = useState([]);
  const { token, setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/historys`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setHistory(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  return (
    <Layaout>
      <div className="text-center text-[#085E7D] text-5xl p-20 w-full">
        History Payment
      </div>
      {history.map((item) => (
        <CardHistory
          key={item.id}
          id={item.id}
          roomId={item.Rooms.id}
          roomName={item.Rooms.room_name}
          grossAmount={format(item.total_rental_price)}
          dateStart={item.date_start}
          dateEnd={item.date_end}
        />
      ))}
    </Layaout>
  );
}
export default Historypayment;
