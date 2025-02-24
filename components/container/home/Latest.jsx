import Container from "@/components/common/Container";
import React from "react";
import Image from "next/image";
import image from "../../../public/images/section1.1.webp";
import image2 from "../../../public/images/section1.2.jpg";
import { ArrowRightIcon } from "lucide-react";

export default function Latest() {
  return (
    <div className="bg-primary py-[110px]  text-white">
      <Container className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-0  justify-between ">
        <div className=" px-5 ">
          <div className="text-center items-center md:items-start md:text-left flex flex-col gap-6 md:pr-16">
            <div className="flex flex-col  gap-6">
              <h2 className="uppercase text-white text-[70px] font-ivyMedium leading-[62px]">
                MEET ISABeLLE
              </h2>
              <h3 className="text-white text-[25px] font-light  font-ivyMedium uppercase leading-[35px]">
                THE FOUNDER AND CEO
              </h3>
              <p>
                My coaching journey has deep roots in my personal business path.
              </p>
              <p className="pb-10">
                Once, I too faced many challenges and difficulties as I
                navigated the world of entrepreneurship.
              </p>
            </div>
            <button className="bg-[#85705F] hover:bg-black hover:text-white transition-all duration-300 text-white text-sm px-7 w-fit py-4 flex items-center gap-4">
              Read More
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className=" px-5  ">
          <Image src={image} alt="latest" />
        </div>

        <div className=" px-5 lg:px-[50px]">
          <div className="grid  grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-6  ">
            <Image
              src={image2}
              alt="latest"
              className="w-[180px] h-[200px] sm:w-full sm:h-full object-cover"
            />

            <div className=" h-full">
              <h1 className="text-white text-[22px]  font-light pt-[20px] font-ivyMedium uppercase ">
                Empowering your vision
              </h1>
              <p className="text-white text-[25px]  font-light font-ivy pt-3 leading-[25px]">
                Transforming challenges into opportunities
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
