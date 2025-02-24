import React from "react";
import Container from "@/components/common/Container";
import Image from "next/image";

export default function Travel() {
  const data = [
    {
      image: "/images/section5.1.webp",
      title:
        "Business Success Guide: Key Strategies and Tips for Entrepreneurs",
    },
    {
      image: "/images/section5.2.webp",
      title:
        "Mastering Business Essentials: A Comprehensive Guide for Small Business Owners",
    },
    {
      image: "/images/section5.3.webp",
      title: "Consultations or Q&A Sessions",
    },
  ];
  return (
    <div className="bg-secondary py-[110px] ">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 px-5">
        {/* first */} 
        <div className="border">
          <Image
            src={data[0].image}
            alt={data[0].title}
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex justify-center items-center md:px-20 pb-10 md:pb-0 border-b-2 border-black md:border-none ">
          <h2 className="text-black text-left  md:text-center font-ivyMedium text-3xl md:text-[32px] md:leading-[32px]">
            {data[0].title}
          </h2>
        </div>

        {/* second */}

        <div className="hidden md:flex justify-center items-center md:px-20 pb-10 md:pb-0 border-b-2 border-black md:border-none ">
          <h2 className="text-black text-left md:text-center font-ivyMedium text-3xl md:text-[32px] md:leading-[32px]">
            {data[1].title}
          </h2>
        </div>
        <div className="">
          <Image
            src={data[1].image}
            alt={data[1].title}
            width={1000}
            height={1000}
          />
        </div>

        <div className="md:hidden flex justify-center items-center md:px-20 pb-10 md:pb-0 border-b-2 border-black md:border-none ">
          <h2 className="text-black text-left md:text-center font-ivyMedium text-3xl md:text-[32px] md:leading-[32px]">
            {data[1].title}
          </h2>
        </div>

        {/* third */}
        <div className="">
          <Image
            src={data[2].image}
            alt={data[2].title}
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex justify-center items-center md:px-20 pb-10 md:pb-0 border-b-2 border-black md:border-none ">
          <h2 className="text-black text-left md:text-center font-ivyMedium text-3xl md:text-[32px] md:leading-[32px]">
            {data[2].title}
          </h2>
        </div>
      </Container>
    </div>
  );
}
