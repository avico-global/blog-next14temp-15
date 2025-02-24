import React from "react";

export default function Form() {
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
        <li className=" border-b-2 border-gray-500">
          <input
            type="text"
            placeholder="First Name"
            className="focus:border-none focus:outline-none p-2"
          />
        </li>
        <li className="border-b-2 border-gray-500">
          <input
            type="text"
            placeholder="Last Name"
            className="focus:border-none focus:outline-none p-2"
          />
        </li>
        <li className="border-b-2 border-gray-500">
          <input
            type="email"
            placeholder="Email"
            className="focus:border-none focus:outline-none p-2"
          />
        </li>
        <li className="border-b-2 border-gray-500">
          <input
            type="text"
            placeholder="Industry"
            className="focus:border-none focus:outline-none p-2"
          />
        </li>
      </ul>
      <ul className="w-full flex flex-col gap-2 mt-10">
        <li className="border-b-2 border-gray-500">
          <input
            type="text"
            placeholder="Subject"
            className="focus:border-none focus:outline-none p-2 w-full "
          />
        </li>
        <li className="border-b-2 border-gray-500">
          <textarea
            placeholder="Message"
            className="focus:border-none focus:outline-none p-2 w-full"
          />
        </li>
      </ul>
      <div className="flex justify-center mt-10">
        <button className="bg-[#85705F] text-white px-12 hover:bg-black  py-4 ">
          submit form
        </button>
      </div>
    </div>
  );
}
