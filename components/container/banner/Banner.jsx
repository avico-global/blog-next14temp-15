import React from "react";
import Image from "next/image";
import banner from "@/public/images/banner1.webp";

export default function Banner() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src={banner}
        alt="hero"
        layout="fill"
        objectFit="cover" // Ensures full coverage without zooming
        objectPosition="top" // Moves crop to the bottom
        className="absolute"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white md:text-[96px] text-5xl font-ivyMedium capitalize leading-10 md:leading-[75px]">
          ISABELLE ROCHE
        </h1>
        <p className="text-white md:text-[45px] text-3xl leading-6 md:leading-[48px] pt-4 md:pt-0 font-ivy ">
          Business coaching & consulting 
        </p>
      </div>
    </div>
  );
}
