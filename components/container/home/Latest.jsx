import Container from "@/components/common/Container";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanitizeUrl } from "../../../lib/myFun";
import { ArrowRightIcon } from "lucide-react";

export default function Latest({ blog_list = [], imagePath }) {
  const latestblog = blog_list.slice(0, 1);
  const latestblog2 = blog_list.slice(1, 2);
  
  return (
    <div className="bg-primary py-[110px]  text-white">
      <Container className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-0  justify-between ">
        <div className=" px-5 ">
          <div className="text-center items-center md:items-start md:text-left flex flex-col gap-6 md:pr-16">
            <div className="flex flex-col  gap-6">
              <h2 className="uppercase text-white text-[70px] font-ivyMedium leading-[62px]">
                Latest Posts
              </h2>
              {latestblog.map((blog, index) => (
                <Link
                title={`${blog?.title} - ${blog?.article_category}`}
                  key={blog?.id || index}
                  href={`/${sanitizeUrl(
                    blog?.title
                  )}`}
                >
                  <h3 className="text-white text-[25px] font-light  font-ivyMedium uppercase leading-[35px]">
                    {blog?.title}
                  </h3>

                  <p className="pb-10">{blog?.tagline}</p>
                  <button className="bg-[#85705F] hover:bg-black hover:text-white transition-all duration-300 text-white text-sm px-7 w-fit py-4 flex items-center gap-4">
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {latestblog.map((blog, index) => (
          <Link
          title={`${blog?.title} - ${blog?.article_category}`}
          key={blog?.id || index}
            href={`/${sanitizeUrl(
              blog?.title
            )}`}
          >
            <div  className=" px-5  ">
              <Image
              title={blog?.title}
                src={
                  blog.image ? `${imagePath}/${blog.image}` : "/no-image.png"
                }
                alt="latest"
                width={500}
                height={1000}
                className="w-full h-auto aspect-[3/4] object-cover"
              />
            </div>
          </Link>
        ))}

        <div className=" px-5 lg:px-[50px]">
          {latestblog2.map((blog, index) => (
            <Link
            title={`${blog?.title} - ${blog?.article_category}`}
              key={blog?.id || index}
              href={`/${sanitizeUrl(
                blog?.title
              )}`}
              className="grid  grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-6  "
            >
              <Image
              title={blog?.title}
                src={
                  blog.image ? `${imagePath}/${blog?.image}` : "/no-image.png"
                }
                alt="latest"
                width={500}
                height={1000}
                className="w-[180px] h-[200px] sm:w-full sm:h-full object-cover"
              />

              <div className=" h-full">
                <h2 className="text-white text-[22px]  font-light pt-[20px] font-ivyMedium uppercase ">
                  {blog?.title}
                </h2>
                <p className="text-white text-[25px]  font-light font-ivy pt-3 sm:line-clamp-5 leading-[25px]">
                  {blog?.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
