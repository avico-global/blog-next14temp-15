import React from "react";
import Card2 from "./Card2";
import Container from "@/components/common/Container";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
export default function Mostview({ blog_list, imagePath }) {
  const mustreadblog = blog_list?.filter((item) => item.isMustRead).slice(0, 3);



  return (
    <div className="bg-white font-hanken text-2xl py-[90px]">
      <h3 className="text-center pb-4 text-primary text-[18px] tracking-[3px] font-hanken leading-[24px]">
        THE LATEST
      </h3>
      <h2 className="text-center  text-primary text-[68px] leading-[62px] font-ivyMedium ">
        FROM <span className="font-ivy">the</span> JOURNAL
      </h2>
      <h3 className="text-center pt-9 text-primary text-[16px] tracking-[3px] font-hanken leading-[24px]">
        ALL EVENTS
      </h3>
      <Container className=" px-5  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[58px] pt-[90px]  ">
          {mustreadblog.map((item, index) => (
            <Link
            title={`${item?.title} - ${item?.article_category}`}
            key={item.id || index} href={`/${sanitizeUrl(item?.title)}`} className="">
              <Image
              title={item?.title}
                src={`${imagePath}/${item.image}`}
                alt={item.title}
                width={1000}
                height={1000}
              />
              <div className="flex flex-col items-center justify-center">

              <h2 className="text-black  text-[29px] leading-[35px] text-center px-4 pt-[54px] font-thin font-ivyMedium  ">
                {item.title}
              </h2>
              <p className="text-[16px]  leading-[25px]  text-center pt-7 px-4 font-thin font-hanken ">
                {item.tagline}
              </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
