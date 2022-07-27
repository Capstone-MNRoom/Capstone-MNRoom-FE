import React, { useState } from "react";

import Layaout from "../components/Layout";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import Button from "../components/button";
import Historycomp from "../components/Historycomp";

const Historypayment = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

    fetch(`https://mnroom.capstone.my.id/users/historypayment`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <LoadingDots />;
  } else {
    return (
      <Layaout>
        <div className="mb-auto">
        <Link href="/">
          <p id="btnHomepage" className="text-sm pt-1 underline text-orange-500 ml-10">← Back to Homepage</p>
        </Link>
        <div id="historyPayment" className="text-center text-orange-500 text-4xl font-bold p-20 w-full">
          History Payment
        </div>
        <div>
          {data.map((item) => (
                <Historycomp
                  key={item.id}
                  id={item.id}
                  title={item.room_name}
                  city={item.city}
                  start={item.date_start}
                  end={item.date_end}
                  price={item.rental_price}
                  icon={item.id}
                  button={item.id}
                />
              ))}
        </div>
      </div>
      </Layaout>
    );
  }
}
export default Historypayment;
