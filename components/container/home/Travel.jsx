import React from "react";
import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";
import { sanitizeUrl } from "@/lib/myFun";

export default function Travel({ blog_list = [], imagePath }) {

  const allArticles = blog_list.slice(0, 6);

  return (
    <div className="bg-secondary py-[110px]">
      <Container className="flex flex-col gap-5 md:gap-0 px-5">
        {allArticles.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2">
            {index % 2 === 0 ? (
              <>
                <Link
                title={`${item?.title} - ${item?.article_category}`}
                  key={index}
                  href={`/${sanitizeUrl(
                    item?.title
                  )}`}
                >
                  <div className="border">
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                      title={item?.title}
                        src={
                          item.image
                            ? `${imagePath}/${item.image}`
                            : "/no-image.png"
                        }
                        alt={item.title}
                        height={1800}
                        width={1800}
                        className="object-cover w-full h-full aspect-[3/4]"
                      />
                    </div>
                  </div>
                </Link>

                <div className="flex justify-center items-center md:px-20 pb-10 md:pb-0 border-b-2 border-black md:border-none">
                  <Link
                  title={`${item?.title} - ${item?.article_category}`}
                    key={index}
                    href={`/${sanitizeUrl(
                      item?.title
                    )}`}
                  >
                    <h2 className="text-black text-left md:text-center font-ivyMedium text-3xl md:text-[32px] md:leading-[32px]">
                      {item.title}
                    </h2>
                    <p className=" py-6 ">{item.tagline}</p>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center md:px-20 pb-10 md:pb-0 border-b-2 border-black md:border-none order-2 md:order-1">
                  <Link
                  title={`${item?.title} - ${item?.article_category}`}
                    key={index}
                    href={`/${sanitizeUrl(
                      item?.title
                    )}`}
                  >
                    <h2 className="text-black text-left md:text-center font-ivyMedium text-3xl md:text-[32px] md:leading-[32px]">
                      {item.title}
                    </h2>
                    <p className=" py-6 ">{item.tagline}</p>
                  </Link>
                </div>

                <div className="border order-1 md:order-2">
                  <div className="relative w-full aspect-[3/4]">
                    <Link
                    title={`${item?.title} - ${item?.article_category}`}
                      key={index}
                      href={`/${sanitizeUrl(item?.title)}`}
                    >
                      <Image
                      title={item?.title}
                        src={
                          item.image
                            ? `${imagePath}/${item.image}`
                            : "/no-image.png"
                        }
                        alt={item.title}
                        height={1800}
                        width={1800}
                        className="object-cover w-full h-full aspect-[3/4]"
                      />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </Container>
    </div>
  );
}
