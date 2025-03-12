import React from "react";
import Image from "next/image";
import banner from "@/public/images/categorybanner.webp";
import { useRouter } from "next/router";
export default function Banner({imagePath, categories}) {
  const router = useRouter();
  const { category } = router.query;

  const selectedCategory = categories?.find(
    (cat) => cat.title.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!selectedCategory) return null;

  return (
    <div className="relative w-full h-[50vh]">
      {/* Background Image */}
      <Image
      title={selectedCategory.title}
        src={`${imagePath}/${selectedCategory.image}`}
        alt={selectedCategory.title}
        layout="fill"
        objectFit="cover" // Ensures full coverage without zooming
        objectPosition="top" // Moves crop to the bottom
        className="absolute"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
      <p className="text-white md:text-4xl text-3xl leading-6  md:leading-[48px] pt-4 md:pt-0 font-ivy ">
          You are viewing 
        </p>
        <h1 className="text-white  text-5xl font-ivyMedium capitalize leading-9  ">
        {selectedCategory.title}
        </h1>
       
      </div>
    </div>
  );
}
