import React from "react";

export default function Category() {
  return (
    <div className="flex justify-evenly text-center items-center lg:flex-row md:flex-row flex-col text-orange-500 mt-5 lg:text-4xl md:text-3xl text-xl font-bold underline cursor-pointer">
      <a className="w-24">All</a>
      <a className="w-24">Workspace</a>
      <a className="w-24">Hallroom</a>
      <a className="w-24">Ballroom</a>
    </div>
  );
}
