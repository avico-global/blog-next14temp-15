import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Card({ data, index }) {
  return (
    <div>
      <div className="relative">
        <Image src={data.image} alt={data.title} width={1000} height={1000} />
        <div className="absolute bottom-[-18px] text-center w-full bg-transparent text-white text-[105px] font-light  font-ivyMedium uppercase leading-[35px]">
          0{index}
        </div>
      </div>

      <h3 className="text-white text-[23px] leading-[27px] text-center border-b-[1px] border-gray-400 pb-7 pt-14 font-thin font-ivyMedium uppercase ">
        {data.title}
      </h3>
      <Link href={`/blog/${data.id}`}>
      <button className="bg-transparent hover:bg-white hover:text-black transition-all duration-300 text-white text-[16px] font-hanken uppercase px-7 w-full py-[15px] flex flex-row justify-center items-center text-center gap-5">
        Read More
        <ArrowRightIcon className="w-4 h-4" />
      </button>
      </Link>
    </div>
  );
}
