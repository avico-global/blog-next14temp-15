import React from "react";
import Container from "@/components/common/Container";
import Card from "./Card";
import Image from "next/image";
export default function 

popular() {
  const data = [
    {
      image: "/images/section2.1.webp",
      title: "Business Strategy Development",
    },
    {
      image: "/images/section3.2.png",
      title: "Leadership and Communication Training",
    },
    {
      image: "/images/section3.3.webp",
      title: "Work-Life Balance Coaching",
    },
  ];
  return (
    <div className="bg-primary">
      <Container className="lg:px-10 px-4 flex flex-col items-center justify-center  py-[100px]">
        <h1 className="text-center  text-white text-[68px] font-ivyMedium leading-[62px]">
          THE SERVICES
        </h1>

        <div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] pt-[90px] px-12">
          {data.map((item, index) => (
            <Card data={item} index={index + 1} />
          ))}
        </div>
      </Container>
    </div>
  );
}
