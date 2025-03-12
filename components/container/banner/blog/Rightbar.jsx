import React from "react";
import Image from "next/image";
import image from "../../../../public/images/category2.webp";
import Link from "next/link";
import image1 from "../../../../public/images/category1.webp";
import image2 from "../../../../public/images/category3.webp";
import image3 from "../../../../public/images/category4.webp";
import MarkdownIt from "markdown-it";
import { sanitizeUrl } from "@/lib/myFun";
import { useRouter } from "next/router";
export default function Rightbar({ imagePath, categories, about_me }) {
  const router = useRouter();
  const { category } = router.query;
  const markdon = new MarkdownIt();
  const aboutMeData = markdon?.render(about_me?.value || " ");

  const categoriesData =
    categories.filter((item) => item.category === category) || [];
  return (
    <div className=" sticky top-0 ">
      {/* about me */}
      <Link title="About Us" href="/about" className="flex flex-col gap-4">
        <h2 className="text-2xl font-ivyMedium underline underline-offset-8 decoration-1 leading-[3rem] decoration-gray-500 font-medium w-full text-center capitalize">
          About us
        </h2>

        <div className="w-full h-full ">
          <Image
            src={`${imagePath}/${about_me?.file_name}`}
            title={about_me?.title || "ABout Us"}
            height={1000}
            width={1000}
            alt="#"
            className=" aspect-[4/5] object-cover"
          />
        </div>
        <div className="">
          <div className="prose lg:prose-sm  text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
            <div
              dangerouslySetInnerHTML={{ __html: aboutMeData.slice(0, 180) }}
            />
          </div>
        </div>
        <div className="flex items-center pb-10 justify-center">
          <button className="bg-transparent text-black border border-black px-8 py-3  w-fit mx-auto">
            My Whole Story
          </button>
        </div>
      </Link>
      {/* categories */}
      <div>
        <h2 className="text-2xl font-ivyMedium pb-6 underline underline-offset-8 decoration-1 leading-[3rem] decoration-gray-500 font-medium w-full text-center capitalize">
          Categories
        </h2>
        <div className="flex flex-col gap-6">
          {categoriesData.map((item, index) => (
            <div key={index}>
              <Link className="relative" href={`/category/${sanitizeUrl(item?.title)}`}>
                <div className="w-full overflow-hidden ">
                  <Image
                  title={item?.title}
                    src={`${imagePath}/${item?.image}` || ""}
                    height={1000}
                    width={1000}
                    alt="#"
                    className=" aspect-[8/4] object-cover hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="absolute top-[40%] left-5  text-white text-3xl font-ivy font-medium">
                  {item?.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
