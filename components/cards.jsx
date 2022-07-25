import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenContext } from "../utils/context";
import format from "../utils/formatprice";

export const CardEvenList = (props) => {
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/updateroom/${id}`);
  };

  const handleDelete = () => {
    let myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${token}`);
    myHeaders.append(`Content-Type`, `application/json`);

    let requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mnroom.capstone.my.id/rooms/${props.delete}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { status } = result;
        if (status === "success") {
          alert(status);
          window.location.reload();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="border-2 border-b-slate-500 rounded-lg drop-shadow-2xl">
      <div className="max-w-sm py-8">
        <div className="h-96 flex justify-center cursor-pointer">
          <Link href={`/${props.id}`}>
            <img
              src={props.image}
              className="h-full w-[90%]"
              alt=""
              width={250}
              height={50}
            />
          </Link>
        </div>
        <div className="flex ml-1">
          <div className="p-3 pb-0">
            <div className="font-bold text-black text-lg">{props.title}</div>
            <div className="font-bold flex justify-between text-black/95">
              Rp {format(props.price)}
            </div>
            <div className="text-black/70">{props.city}</div>
          </div>
        </div>
      </div>

      <div>
        {props.edit && ( // 1, 2
          <div className="flex my-2 px-2">
            <button
              className=" bg-teal-600  px-4 text-black font-bold rounded"
              onClick={() => handleEdit(props.edit)}
            >
              Edit
            </button>
          </div>
        )}
        {props.delete && (
          <div className="flex px-2">
            <button
              className=" bg-red-800  px-4 text-white font-bold rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
