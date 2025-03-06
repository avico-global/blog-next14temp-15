import React from "react";
import Image from "next/image";
import Link from "next/link";

import MarkdownIt from "markdown-it";

export default function Rightbar({ about_me, imagePath, categories }) {
  const showCategory = categories.slice(0, 4);
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me?.value || "");

  return (
    <div className=" sticky top-0 ">
      {/* about me */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-ivyMedium underline underline-offset-8 decoration-1 leading-[3rem] decoration-gray-500 font-medium w-full text-center capitalize">
          About Us
        </h2>

        <div className="w-full h-full ">
          <Image
            src={`${imagePath}/${about_me.file_name}`}
            title={about_me.title || "ABout Us" }
            height={1000}
            width={1000}
            alt="#"
            className=" aspect-[4/5] object-cover"
          />
        </div>
        <p className="">
          <article className="prose lg:prose-sm text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
            <div dangerouslySetInnerHTML={{ __html: content.slice(0, 180) }} />
          </article>
        </p>
        <Link 
        title="About Us"
        href="/about" className="flex items-center pt-10 justify-center">
          <button className="bg-transparent text-black border border-black px-8 py-3  w-fit mx-auto">
            My Whole Story
          </button>
        </Link>
      </div>
      <div>
        <h2 className="text-2xl font-ivyMedium pb-6 underline underline-offset-8 decoration-1 leading-[3rem] decoration-gray-500 font-medium w-full text-center capitalize">
          Categories
        </h2>
        <div className="flex flex-col gap-6">
          {showCategory.map((item, index) => (
            <div key={index}>
              <Link
                title={item.title}
                className="relative"
                href={`/${item.category}`}
              >
                <div className="w-full overflow-hidden ">
                  <Image
                    src={`${imagePath}/${item.image}`}
                    title={item.title}
                    height={1000}
                    width={1000}
                    alt="#"
                    className=" aspect-[8/4] object-cover hover:scale-105 transition-all duration-300"
                  />
                </div>
                <p className="absolute top-[40%] left-5  text-white text-3xl font-ivy font-medium">
                  {item.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
