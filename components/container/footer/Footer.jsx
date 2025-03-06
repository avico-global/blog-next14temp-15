import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import Image from "next/image";
import Logo from "../navbar/Logo";
import MarkdownIt from "markdown-it";
import { sanitizeUrl } from "@/lib/myFun";

export default function Footer({
  logo,
  imagePath,
  about_me,
  categories = [],
  blogs = [],
}) {
  const popularBlogs = blogs.slice(0, 5);

  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me?.value || "");
  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <footer className="bg-[#1C1C1C] text-white py-10 md:py-20">
      <Container className="md:px-12 lg:px-24 py-5 max-w-[1100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 p-8 lg:p-0 ">
          <ul className="flex-col flex items-center sm:items-start justify-center gap-3">
            <h3 className="text-xl sm:text-2xl text-center sm:text-left pb-2 font-bold">
              Quick Links
            </h3>
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  className="text-sm text-center text-[#f7f7f7] hover:text-text px-3  font-hanken uppercase font-thin"
                  href={page.href}
                  title={page.name}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex flex-col items-center text-center col-span-2 space-y-4 justify-center px-4 sm:px-[10px]">
            <Logo logo={logo} imagePath={imagePath} />

            <article className="prose lg:prose-sm prose-invert text-center">
              <div
                dangerouslySetInnerHTML={{ __html: content.slice(0, 190) }}
              />
            </article>
          </div>

          <div className="flex-col flex items-center sm:items-start md:items-end">
            <h3 className="text-xl sm:text-2xl text-center sm:text-left pb-2 font-bold">
              Categories
            </h3>
            <ul className="flex flex-col w-fit gap-3 ">
              {categories?.map((category) => (
                <li key={category.title}>
                  <Link
                    className="text-sm text-center text-[#f7f7f7] hover:text-text px-3 font-hanken uppercase font-thin"
                    href={`/${encodeURI(sanitizeUrl(category.title))}`}
                    title={category.title}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* bottom section */}
      <Container className="py-6 md:py-10 px-4 sm:px-5 border-t border-white/25">
        <h2 className="text-center text-xl sm:text-2xl py-2 font-ivyMedium uppercase">
          Popular Posts
        </h2>
        <h3 className="text-center text-xl  pb-8  font-ivy  ">Follow Me!</h3>
        <Card popularBlogs={popularBlogs} imagePath={imagePath} />
      </Container>

      {/* contact us section */}
      <Container className="py-10 md:py-20 px-4 sm:px-5">
        <h2 className="text-center text-xl sm:text-2xl py-2 font-ivyMedium uppercase">
          JOIN OUR LIST
        </h2>
        <p className="text-center text-lg sm:text-xl pb-8 font-hanken">
          Receive updates on special promotions, exclusive events and
          announcements.
        </p>
        <div className="py-7">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
            <input
              type="text"
              placeholder="Email Address"
              className="w-full sm:w-auto focus:outline-none border bg-transparent border-white/15 rounded-none px-4 h-12 sm:h-16"
            />
            <button className="w-full sm:w-auto bg-[#85705F] text-white px-8 hover:bg-black h-12 sm:h-16">
              sign up
            </button>
          </div>
          <div className="flex flex-row items-center justify-center gap-4 h-20 text-hanken ">
            <input
              type="checkbox"
              className="w-6 h-6 appearance-none border border-white/15 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full"
            />
            <p className="text-sm text-text">
              I have read and agree to the{" "}
              <Link 
                href="/privacy-policy" 
                className="text-white hover:underline"
                title="Privacy Policy"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link 
                href="/terms-and-conditions" 
                className="text-white hover:underline"
                title="Terms and Conditions"
              >
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export function Card({ popularBlogs = [], imagePath }) {
  return (
    <div className="grid grid-cols-2 gap-[2px] md:flex md:justify-center md:gap-3">
      {popularBlogs.map((item, index) => (
        <div
          key={index}
          className={`group relative w-full ${
            index === popularBlogs.length - 1 ? "col-span-2" : ""
          } md:w-[20%]`}
        >
          <Link
            href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
              item?.title
            )}`}
            className="block w-full aspect-square overflow-hidden"
            title={item.title}
          >
            <Image
              src={item.image ? `${imagePath}/${item.image}` : "/no-image.png"}
              title={item.title}
              alt={item.title || "Blog image"}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              priority={true}
              onError={(e) => {
                e.target.src = "/no-image.png";
              }}
            />

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

            <div className="absolute inset-[20px]">
              <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-1000 bg-origin-padding">
                <div className="absolute top-0 left-1/2 w-full h-[1px] bg-white -translate-x-1/2 " />
                <div className="absolute bottom-0 left-1/2 w-full h-[1px] bg-white -translate-x-1/2 " />
                <div className="absolute left-0 top-1/2 h-full w-[1px] bg-white -translate-y-1/2 " />
                <div className="absolute right-0 top-1/2 h-full w-[1px] bg-white -translate-y-1/2 " />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
