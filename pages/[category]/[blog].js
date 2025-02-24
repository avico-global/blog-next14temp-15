import React from 'react'
import Image from 'next/image'
import image from "../../public/images/category3.webp"
import Container from '../../components/common/Container'
import Navbar from '../../components/container/navbar/Navbar'
import FixNavbar from '../../components/container/navbar/FixNavbar'
import Slider from '../../components/container/banner/Slider'
import Footer from '../../components/container/footer/Footer'
export default function Blog() {
    return (
        <>
            <FixNavbar text={"text-black"} />
            <Navbar />
            <Container className="mt-20 px-5 lg:max-w-[1130px]">
                <div className="flex flex-col gap-6 py-10">
                    <div className="flex flex-col gap-6 text-left  md:text-center py-10">
                        <h2 className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                            Life Style
                        </h2>
                        <p className="font-ivyMedium  text-[40px] text-black leading-10 font-thin ">
                            Celebrity Style Steals: Get the Look for Less
                        </p>
                        <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                            February 14, 2025
                        </div>
                    </div>
                    <Image
                        src={image}
                        height={1300}
                        width={1300}
                        alt="#"
                        quality={100}
                        className="h-auto w-auto max-w-full max-h-full object-contain"
                    />

                </div>
                <div className="flex flex-col gap-6 py-10 lg:px-28">
                    <p>
                        Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams “you,” only to discover it’s worth more than your monthly rent? We’ve all been there, sighing at the dream of replicating those luxe looks without breaking the bank. Well, dream no more! Our latest guide, “Celebrity Style Steals: Get the Look for Less,” is here to turn that sigh into a stylish strut.
                    </p>
                </div>
                <div className="flex items-center gap-7">
                    <div className="flex-1 border-t border-gray-100"></div>
                    <span className="text-md font-ivyMedium font-thin capitalize">You might also like</span>
                    <div className="flex-1 border-t border-gray-100"></div>
                </div>
                <Slider className="" />
            </Container>
            <Footer />

        </>
    )
}
