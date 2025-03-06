import Container from "@/components/common/Container";
import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";
import Link from "next/link";

export default function Latest({ blogs = [], imagePath }) {
  const latestBlogs = blogs.slice(1, 2);
  const mustReadBlogs = blogs.slice(0, 1);

  return (
    <div className="bg-primary py-[110px]  text-white">
      <Container className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-0  justify-between ">
        <div className=" px-5 ">
          <div className="text-center items-center md:items-start md:text-left flex flex-col gap-6 md:pr-16">
            <div className="flex flex-col  gap-6">
              <h2 className="uppercase text-white text-[70px] font-ivyMedium leading-[62px]">
                Latest Posts
              </h2>

              {latestBlogs.map((blog, index) => (
                <Link
                  title={blog.title}
                  href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
                    blog?.title
                  )}`}
                >
                  <div key={blog.id || index}>
                    <h3 className="text-white text-[25px] font-light  font-ivyMedium uppercase leading-[35px]">
                      {blog.title}
                    </h3>
                    <p className="py-10">{blog.tagline}</p>
                  </div>
                  <button className="bg-[#85705F] hover:bg-black hover:text-white transition-all duration-300 text-white text-sm px-7 w-fit py-4 flex items-center gap-4">
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {latestBlogs.map((blog, index) => (
          <Link
            title={blog.title}
            href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
              blog?.title
            )}`}
          >
            <div key={blog.id || index} className=" px-5  ">
              <Image
                src={
                  blog.image ? `${imagePath}/${blog.image}` : "/no-image.png"
                }
                title={blog.title}
                alt="latest"
                width={500}
                height={1000}
              />
            </div>
          </Link>
        ))}

        {mustReadBlogs.map((blog, index) => (
          <Link
            title={blog.title}
            href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
              blog?.title
            )}`}
          >
            <div key={blog.id || index} className=" px-5 lg:px-[50px]">
              <div className="grid  grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-6  ">
                <Image
                  src={
                    blog.image ? `${imagePath}/${blog.image}` : "/no-image.png"
                  }
                  title={blog.title}
                  alt="latest"
                  className="w-[180px] h-[200px] sm:w-full sm:h-full object-cover"
                  width={500}
                  height={1000}
                />

                <div className=" h-full">
                  <h2 className="text-white text-[22px]  font-light pt-[20px] font-ivyMedium uppercase ">
                    {blog.title}
                  </h2>
                  <p className="text-white text-[25px]  font-light font-ivy pt-3 leading-[25px]">
                    {blog.tagline}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Container>
    </div>
  );
}
