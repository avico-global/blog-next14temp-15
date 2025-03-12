import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Card2({ data }) {
  const title = data.title.toLowerCase().replace(/\s+/g, "-");
  const category = data.category.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link href={`/${category}/${title}`} className="">
      <Image src={data.image} alt={data.title} width={1000} height={1000} />
      <h2 className="text-black text-[29px] leading-[35px] text-center px-4 pt-[54px] font-thin font-ivyMedium  ">
        {data.title}
      </h2>
      <p className="text-[16px]  leading-[25px]  text-center pt-7 px-4 font-thin font-hanken ">
        {data.tagline}
      </p>
    </Link>
  );
}
