import React from "react";
import Container from "@/components/common/Container";
import Card from "./Card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";
export default function Popular({ blog_list, imagePath }) {
  const data = blog_list.filter((item) => item.isPopular).slice(0, 3);

  return (
    data.length > 0 && (
      <div className="bg-primary">
        <Container className="lg:px-10 px-4 flex flex-col items-center justify-center  py-[100px]">
          <h1 className="text-center  text-white text-[68px] font-ivyMedium leading-[62px]">
            The Most Popular
          </h1>

          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] pt-[90px] px-12">
            {data?.map((item, index) => (
              <Link
                className=" flex flex-col justify-between"
                title={`${item?.title} - ${item?.article_category}`}
                href={`/${sanitizeUrl(item?.title)}`}
                key={item.id || index}
              >
                <div className="">
                  <div className="relative">
                    <Image
                      title={item.title}
                      src={`${imagePath}/${item.image}`}
                      alt={item.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full aspect-[3/4] object-cover"
                    />
                    <div className="absolute bottom-[-18px] text-center w-full bg-transparent text-white text-[105px] font-light  font-ivyMedium uppercase leading-[35px]">
                      0{index}
                    </div>
                  </div>

                  <h3 className="text-white text-[23px] leading-[27px] text-center  pb-7 pt-14 font-thin font-ivyMedium uppercase ">
                    {item.title}
                  </h3>
                </div>
                <div>
                  <button className="bg-transparent hover:bg-white hover:text-black   border-t-[1px] border-gray-400 transition-all duration-300 text-white text-[16px] font-hanken uppercase px-7 w-full py-[15px] flex flex-row justify-center items-center text-center gap-5">
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    )
  );
}
