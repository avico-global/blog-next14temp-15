import React from 'react'
import Rightbar from '@/components/container/banner/blog/Rightbar'
import Image from 'next/image'
import image from "../public/images/category3.webp"
import image2 from "../public/images/codesupply3.3.webp"
import image3 from "../public/images/category1.webp"
import Container from '../components/common/Container'
import Navbar from '../components/container/navbar/Navbar'
import FixNavbar from '../components/container/navbar/FixNavbar'
import Footer from '../components/container/footer/Footer'
export default function Blog() {
    const blog = [
        {
            id: 1,
            image: image,
            category: "Travel",
            date: "February 14, 2025",
            title: "Celebrity Style Steals: Get the Look for Less",
        },
        {
            id: 2,
            image: image2,
            category: "Travel",
            date: "February 15, 2025",
            title: "Celebrity Style Steals: Get the Look for Less",
        },
        {
            id: 3,
            image: image3,
            category: "Travel",
            date: "February 16, 2025",
            title: "Celebrity Style Steals: Get the Look for Less",
        },
    ];

    return (
        <>
            <Navbar />
            <FixNavbar text={"text-black"} />
            <Container className="mt-20 py-10 px-5 md:px-15 lg:px-24">
                <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
                    {/* Left Content */}
                    <div className="col-span-2">
                        {/* content */}
                        <div className="flex flex-col gap-6 py-10 text-left md:text-center">

                            <h2 className=" text-2xl font-ivyMedium font-medium w-full text-center capitalize">
                                THE BLOG
                            </h2>
                            <p className="font-ivyMedium  text-[40px] text-primary md:px-5 leading-10 font-thin ">
                                Welcome to my vibrant world of fashion, style, and sustainable living!
                            </p>
                            <div className="text-[19px] leading-[22px] md:px-20 font-thin font-hanken">
                                I'm Emily Bouquet, your guide and companion on this journey through the ever-evolving landscape of trends, timeless elegance, and eco-conscious choices.
                            </div>

                        </div>

                        {blog.map((item, index) => (
                            <div key={index} className="flex flex-col gap-6 py-10">
                                <Image
                                    src={item.image}
                                    height={1300}
                                    width={1300}
                                    alt="#"
                                    quality={100}
                                    className="h-auto w-auto max-w-full max-h-full object-contain"
                                />
                                <div className="flex flex-col gap-6 py-10">
                                    <h2 className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                                        {item.category}
                                    </h2>
                                    <p className="font-ivyMedium  text-[40px] text-black leading-10 font-thin ">
                                        {item.title}
                                    </p>
                                    <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                                        {item.date}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Right Sidebar (Sticky) */}
                    <div className="col-span-1 h-full">
                        <div className="sticky top-20">
                            <Rightbar

                            />
                        </div>
                    </div>
                </div>
            </Container >
            <Footer />
        </>
    )
}
