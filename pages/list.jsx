import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import Card from "../components/cards";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Photo from "../assets/foto-form.png";
import { CardEvenList } from "../components/cards";
import { useEffect } from "react";

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);
  const [dataImage, setDataImage] = useState([]);

  return (
    <Layout>
      <div className="text-center font-bold text-3xl text-orange-400 pt-12 pb-12">
        <h1>My Rooms</h1>
      </div>
      <div>
        <div className="col-3 w-full border-b-4 grow flex border-gray-300 rounded border-r border-l">
          {data.map((item) => (
            <CardEvenList
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              location={item.address}
              price={item.price}
            />
          ))}
          <div className="flex gap-x-4 text-right pl-56 drop-shadow-2xl">
            <div>
              {/* <Link href={`/updateEvent`}> */}
              <EditIcon
                className="edit-icon text-sky-900"
                onClick={() => handleEdit()}
              />
              {/* </Link> */}
            </div>
            <div className="text-rose-700">
              <DeleteIcon
                className="delete-icon"
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default List;
