import React from "react";
import Image from "next/image";
import banner from "@/public/images/banner1.webp";

export default function Banner({data , image}) {

   
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
      title={data?.title}
        src={image}
        alt="hero"
        width={1920}
        height={1080}
        className="absolute object-cover h-full w-full object-top"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-white md:text-[96px] text-5xl font-ivyMedium capitalize leading-10 md:leading-[75px]">
          {data?.title}
        </h2>
        <p className="text-white md:text-[45px] text-3xl leading-6 md:leading-[48px] pt-4  font-ivy ">
          {data?.tagline}
        </p>
      </div>
    </div>
  );
}
