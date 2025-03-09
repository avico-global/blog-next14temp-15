import React from "react";
import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";

export default function popular({ blogs = [], imagePath, blog_list }) {
  const popularBlogs = blog_list.filter((item) => item.isPopular).slice(0, 3);

  return (
    <div className="bg-primary">
      <Container className="lg:px-10 px-4 flex flex-col items-center justify-center  py-[100px]">
        <h2 className="text-center  text-white text-[68px] font-ivyMedium leading-[62px]">
          THE POPULAR
        </h2>

        <div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] pt-[90px] px-12">
          {popularBlogs.map((item, index) => (
            <Link
              key={index}
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              title={item.title}
            >
              <div className="relative">
                <Image
                  src={
                    item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  title={item.title || "Blog Image" }
                  alt={item.title}
                  width={1000}
                  height={1000}
                />
                <div className="absolute bottom-[-18px] text-center w-full bg-transparent text-white text-[105px] font-light  font-ivyMedium uppercase leading-[35px]">
                  0{index}
                </div>
              </div>

              <h3 className="text-white text-[23px] leading-[27px] text-center border-b-[1px] border-gray-400 pb-7 pt-14 font-thin font-ivyMedium uppercase ">
                {item.title}
              </h3>

              <button className="bg-transparent hover:bg-white hover:text-black transition-all duration-300 text-white text-[16px] font-hanken uppercase px-7 w-full py-[15px] flex flex-row justify-center items-center text-center gap-5">
                Read More
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
