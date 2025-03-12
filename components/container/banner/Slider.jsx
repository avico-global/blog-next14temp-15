"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight,} from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";



export default function Slider({blog_list,imagePath}) {
  const posts = blog_list.filter((item)=> item.editorsChoice)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [hovering, setHovering] = useState(false);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + slidesToShow >= posts.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? posts.length - slidesToShow : prev - 1
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="relative w-full mx-auto py-7 overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        handleMouseLeave();
      }}
    >
      <div className="flex relative items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className={`p-2 absolute top-1/2 left-5 bg-gray-200 z-10 rounded-full transition-all duration-500 ${
            hovering ? "translate-x-[15px] opacity-100" : "translate-x-0 opacity-0"
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Slider Container */}
        <div 
          className="overflow-hidden w-full border-x-[1px] border-gray-200"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none'
          }}
        >
          <div
            className={`flex transition-transform duration-500 ${
              isDragging ? 'transition-none' : ''
            }`}
            style={{ transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)` }}
          >
            {posts.map((post) => (
              <div key={post.id} className={`flex-shrink-0 flex px-3 flex-row w-full sm:w-1/2 lg:w-1/3`}>
                <Link
                title={post.title}
                 href={`/${sanitizeUrl(post.article_category)}/${sanitizeUrl(post.title)}`} className="text-center">
                  <Image
                    title={post.title}
                    src={`${imagePath}/${post.image}`}
                    alt={post.title}
                    width={1000}
                    height={1000}
                    className="aspect-square object-cover"
                  />
                  <h3 className="mt-2 font-ivyMedium text-2xl px-3 pb-2 pt-4">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className={`p-2 absolute top-1/2 right-5 bg-gray-200 rounded-full transition-all duration-500 ${
            hovering ? "-translate-x-[15px] opacity-100" : "lg:translate-x-0 lg:opacity-0"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
