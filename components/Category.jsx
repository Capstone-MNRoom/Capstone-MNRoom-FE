import React from "react";

export default function Category() {
  return (
    <div className="flex justify-evenly text-orange-500 mt-5 text-4xl font-bold underline">
      <a className="w-24">All</a>
      <a className="w-24">Workspace</a>
      <a className="w-24">Hallroom</a>
      <a className="w-24">Ballroom</a>
    </div>
  );
}
