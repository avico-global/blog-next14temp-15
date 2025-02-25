import React from "react";
import Container from "@/components/common/Container";
import Image from "next/image";

export default function Travel({ blog_list = [], imagePath }) {
  const allArticles = blog_list?.slice(0, 3);
  console.log("allArticles", allArticles);
  return (
    <div className="bg-secondary py-[110px] ">
      {allArticles.map((article, index) => (
        <div key={index || article.id} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 px-5">
          <div className="border">
            <Image
              src={`${imagePath}/${article.image}`}
              alt={article.title}
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex justify-center items-center md:px-20 pb-10 md:pb-0 border-b-2 border-black md:border-none ">
            <h2 className="text-black text-left  md:text-center font-ivyMedium text-3xl md:text-[32px] md:leading-[32px]">
              {article.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
