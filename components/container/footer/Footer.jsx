import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const categories = [
    { name: "Category 1", href: "/category1" },
    { name: "Category 2", href: "/category2" },
    { name: "Category 3", href: "/category3" },
  ];

  return (
    <footer className="bg-[#1C1C1C]  text-white py-20 ">
      <Container className="md:px-24 py-5 max-w-[1100px]  ">
        <div className="md:hidden  flex flex-col items-center col-span-2  justify-center   px-[10px] ">
          <h2 className="text-5xl text-center font-ivyMedium uppercase ">
            Isabelle Roche
          </h2>
          <p className="py-2 text-[11px] text-center text-[#f7f7f7] px-3  font-hanken uppercase font-thin">
            I’m based in Los Angeles, CA but available for travel worldwide.
          </p>
          <p className="py-1 text-[11px] text-center text-[#f7f7f7] px-3  font-hanken uppercase font-thin">
            E. contact@isabelleroche.com
          </p>
          <p className="py-2 text-[11px] text-center text-[#f7f7f7] px-3  font-hanken uppercase font-thin">
            T. 555 – 352 – 6521
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 ">
          <ul className=" flex-col flex items-start justify-center gap-3 ">
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  className="text-sm text-center text-[#f7f7f7] hover:text-text px-3  font-hanken uppercase font-thin"
                  href={page.href}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex flex-col items-center col-span-2  justify-center px-[10px] ">
            <h2 className="text-5xl pb-6 text-center lg:px-24 font-ivyMedium uppercase ">
              Isabelle Roche
            </h2>
            <p className="py-2 text-[11px] text-center text-[#f7f7f7] px-3  font-hanken uppercase font-thin">
              I’m based in Los Angeles, CA but available for travel worldwide.
            </p>
            <p className="py-1 text-[11px] text-center text-[#f7f7f7] px-3  font-hanken uppercase font-thin">
              E. contact@isabelleroche.com
            </p>
            <p className="py-2 text-[11px] text-center text-[#f7f7f7] px-3  font-hanken uppercase font-thin">
              T. 555 – 352 – 6521
            </p>
          </div>

          <div className=" flex-col flex items-start md:items-end ">
            <ul className="flex flex-col w-fit gap-3 ">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    className="text-sm  text-center text-[#f7f7f7] hover:text-text px-3  font-hanken uppercase font-thin"
                    href={category.href}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* bottom section */}
      <Container className="py-10 px-5 border-t border-white/25 ">
        <h2 className="text-center text-2xl py-2  font-ivyMedium uppercase ">
          Popular Posts
        </h2>
        <h3 className="text-center text-xl  pb-8  font-ivy  ">Follow Me!</h3>
        <Card className="" />
      </Container>

      {/* contact us section */}
      <Container className="py-20 px-5 ">
        <h2 className="text-center text-2xl py-2  font-ivyMedium uppercase ">
          JOIN OUR LIST
        </h2>
        <p className="text-center text-xl  pb-8  font-hanken  ">
          Receive updates on special promotions, exclusive events and
          announcements.
        </p>
        <div className="py-7">
          <div className="flex flex-row items-center justify-center gap-2 h-16 ">
            <input
              type="text"
              placeholder="First Name "
              className="  focus:outline-none border bg-transparent border-white/15 rounded-none px-4  h-full"
            />
            <input
              type="text"
              placeholder="Email Address"
              className="  focus:outline-none border bg-transparent border-white/15 rounded-none px-4  h-full"
            />
            <button className="bg-[#85705F] text-white px-8 hover:bg-black   h-full ">
              sign up
            </button>
          </div> 
            <div className="flex flex-row items-center justify-center gap-4 h-20 text-hanken ">
              <input type="checkbox" className="w-6 h-6 appearance-none border border-white/15 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full" />
              <p className="text-sm text-text">I have read and agree to the <Link href="/privacy-policy" className="text-white">Privacy Policy</Link> </p>
            </div>
        </div>
      </Container>
    </footer>
  );
}

export function Card() {
  const data = [
    { image: "/images/section1.1.webp", title: "title1" },
    { image: "/images/section1.1.webp", title: "title1" },
    { image: "/images/section1.1.webp", title: "title1" },
    { image: "/images/section1.1.webp", title: "title1" },
    { image: "/images/section1.1.webp", title: "title1" }, // Last one
  ];

  return (
    <div className="grid grid-cols-2 gap-[2px] md:flex md:justify-center md:gap-3">
      {data.map((item, index) => (
        <div
          key={index}
          className={`group relative w-full ${
            index === data.length - 1 ? "col-span-2" : ""
          } md:w-[20%]`} // md pe har image 20% width le gi
        >
          {/* Image container */}
          <Link
            href={item.title}
            className="block w-full aspect-square overflow-hidden"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay on hover */}
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Inner border with gap */}
            <div className="absolute inset-[20px]">
              <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-1000 bg-origin-padding">
                {/* Top border */}
                <div className="absolute top-0 left-1/2 w-full h-[1px] bg-white -translate-x-1/2 " />
                {/* Bottom border */}
                <div className="absolute bottom-0 left-1/2 w-full h-[1px] bg-white -translate-x-1/2 " />
                {/* Left border */}
                <div className="absolute left-0 top-1/2 h-full w-[1px] bg-white -translate-y-1/2 " />
                {/* Right border */}
                <div className="absolute right-0 top-1/2 h-full w-[1px] bg-white -translate-y-1/2 " />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
