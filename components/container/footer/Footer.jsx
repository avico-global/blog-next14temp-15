import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import MarkdownIt from "markdown-it";
import Logo from "../navbar/Logo";
export default function Footer({
  logo,
  categories,
  blog_list,
  imagePath,
  about_me,
}) {
  const pages = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about-us" },
    { name: "All Articles", href: "/allarticles" },
  ];
  const markdon = new MarkdownIt();
  const aboutMeData = markdon?.render(about_me?.value || " ");

  return (
    <footer className="bg-[#1C1C1C]  text-white py-20 ">
      <Container className="md:px-24 py-5 max-w-[1100px]  ">
        <div className="md:hidden pb-6 md:pb-0  items-start flex flex-col md:items-center col-span-2  justify-center   px-[10px] ">
          <h2 className="text-5xl text-center font-ivyMedium uppercase  ">
            <Logo logo={logo} imagePath={imagePath} />
          </h2>
          <div>
              <div
                className="text-xs md:text-center text-left text-[#f7f7f7] hover:text-text  font-hanken uppercase font-thin"
                dangerouslySetInnerHTML={{ __html: aboutMeData.slice(0, 180) }}
              />
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 ">
          <ul className=" px-5 flex-col flex items-start justify-center gap-3 ">
            Quick Links
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  title={`${page?.name}`}
                  className="text-sm text-center text-[#f7f7f7] hover:text-text px-3  font-hanken uppercase font-thin"
                  href={page.href}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex flex-col items-center col-span-2  justify-center px-[10px] ">
            <h2 className="text-5xl  text-center w-fit font-ivyMedium uppercase  ">
              <Logo logo={logo} imagePath={imagePath} />
            </h2>

            <div>
              <div
                className="text-xs text-center text-[#f7f7f7] hover:text-text px-3  font-hanken uppercase font-thin"
                dangerouslySetInnerHTML={{ __html: aboutMeData.slice(0, 180) }}
              />
            </div>
          </div>

          <div className=" flex-col flex items-start md:items-end ">
            <ul className="flex flex-col w-fit gap-3 ">
              Categories
              {categories.map((item, index) => (
                <li key={index}>
                  <Link
                    className="text-sm  text-center text-[#f7f7f7] hover:text-text px-3  font-hanken uppercase font-thin"
                    key={index}
                    title={item?.title || "Article Link"}
                    href={`/category/${sanitizeUrl(item.title)}`}
                  >
                    {item?.title}
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
        <Card blog_list={blog_list} imagePath={imagePath} />
      </Container>

      {/* contact us section */}
      <Container className="py-20 px-5 ">
      <h2 className="text-center text-xl sm:text-2xl py-2 font-ivyMedium uppercase">
          JOIN OUR LIST
        </h2>
        <p className="text-center text-lg sm:text-xl pb-8 font-hanken">
          Receive updates on special promotions, exclusive events and
          announcements.
        </p>
        <div className="  py-7">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:h-16  ">
            <input
              type="text"
              placeholder="Email Address"
              className="  focus:outline-none border bg-transparent border-white/15 rounded-none px-4 py-4 md:py-0  h-full"
            />
            <button className="bg-[#85705F] text-white px-8 hover:bg-black py-4 md:py-0  h-full ">
              sign up
            </button>
          </div>
          <div className="flex flex-row items-center justify-center gap-4 h-20 text-hanken ">
            <input
              type="checkbox"
              className="w-6 h-6 appearance-none border border-white/15 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full"
            />
            <div className="text-sm text-text">
              I have read and agree to the{" "}
              <Link
                title="Privacy Policy"
                href="/privacy-policy"
                className="text-white"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                title="Terms and conditions"
                href="/terms-and-conditions"
                className="text-white"
              >
                Terms and conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export function Card({ blog_list, imagePath }) {
  const data = blog_list?.slice(0, 5);
  return (
    <div className="grid grid-cols-2 gap-[2px] md:flex md:justify-center md:gap-3">
      {data?.map((item, index) => (
        <div
          key={index}
          className={`group relative w-full ${
            index === data.length - 1 ? "col-span-2" : ""
          } md:w-[20%]`} // md pe har image 20% width le gi
        >
          {/* Image container */}
          <Link
            title={item?.title}
            href={`/${sanitizeUrl(
              item?.title
            )}`}
            className="block w-full aspect-square overflow-hidden"
          >
            {/* Image */}
            <Image
              title={item?.title}
              src={`${imagePath}/${item?.image}`}
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
