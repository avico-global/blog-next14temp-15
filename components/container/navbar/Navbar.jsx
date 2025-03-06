import {
  Search,
  Menu,
  ChevronDown,
  ChevronUp,
  MenuIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Fullcontainer from "../../common/Fullcontainer";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/myFun";
import image1 from "../../../public/images/section4.1.webp";
import image2 from "../../../public/images/section4.2.webp";
import image3 from "../../../public/images/section4.3.webp";

import Logo from "./Logo";

export default function Navbar({
  text,
  blog_list,
  category,
  categories,
  imagePath,
  logo,
  blogs = [],
  className = "",
}) {
  const popularBlogs = blog_list?.filter((item) => item.isPopular);

  const li = `py-2 text-xs ${text} hover:text-text px-3 font-hanken uppercase font-thin`;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Search handling
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggle = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  // Filter blogs based on search query
  const filteredBlogs = blog_list?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add scroll event listener
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle category hover
  const handleCategoryHover = (categoryName) => {
    setActiveCategory(categoryName);
  };

  return (
    <>
      <Fullcontainer
        className={`fixed top-0 left-0 w-full transition-all duration-500 z-30
          ${
            isScrolled
              ? "bg-white text-primary shadow-md"
              : `bg-transparent ${className || "text-white"}`
          }`}
      >
        <div className="py-4 md:py-[10px] sm:px-5">
          <div
            className={`flex justify-between items-center mx-auto ${
              isScrolled ? "text-primary" : className || text
            } px-5`}
          >
            <ul className="flex justify-between items-center gap-6 text-sm font-semibold">
              <button onClick={() => setIsSideNavOpen(true)}>
                <Menu className="w-5 h-5" strokeWidth={1} />
              </button>
              <Logo logo={logo} imagePath={imagePath} />
            </ul>

            <ul className="hidden md:flex justify-between items-center text-md font-semibold">
              <Link title="Home" href="/" className={`${li} ${className}`}>
                Home
              </Link>
              <Link title="Blog" href="/blog" className={`${li} ${className}`}>
                Blog
              </Link>
              <Link
                title="Contct "
                href="/contact"
                className={`${li} ${className}`}
              >
                Contact
              </Link>

              {/* Updated Categories Dropdown */}
              <div
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="relative py-4"
              >
                <div
                  className={`group py-2 bg-transparent px-3 ${
                    className || ""
                  }`}
                >
                  <div className="flex text-xs items-center gap-1 font-hanken font-thin uppercase group hover:cursor-pointer">
                    Categories
                    <ChevronUp className="hidden group-hover:block h-3 w-3" />
                    <ChevronDown className="group-hover:hidden h-3 w-3" />
                  </div>

                  {/* Dropdown Content */}
                  <div
                    className={`absolute top-14 -left-[300px] bg-white/95 backdrop-blur-sm w-[800px] text-black z-10 shadow-2xl transition-all duration-300 rounded-lg
                    ${
                      dropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-[-10px]"
                    }`}
                  >
                    <div className="p-8 grid grid-cols-4 gap-8">
                      {/* Categories List */}
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg mb-6">Categories</h3>
                        {categories?.map((item, index) => (
                          <Link
                            title="item.title"
                            key={index}
                            href={`/${encodeURI(sanitizeUrl(item.title))}`}
                            className={cn(
                              "block py-2 text-sm hover:text-text transition-colors",
                              category === item.name && "text-text font-medium"
                            )}
                            onMouseEnter={() => handleCategoryHover(item.name)}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>

                      {/* Featured Posts */}
                      <div className="col-span-3">
                        <h3 className="font-medium text-lg mb-6">
                          Popular Posts
                        </h3>
                        <div className="grid grid-cols-3 gap-6">
                          {popularBlogs
                            ?.filter(
                              (popularBlogs) =>
                                popularBlogs.category ===
                                (activeCategory || categories?.[0]?.name)
                            )
                            ?.slice(0, 3)
                            ?.map((blog, index) => (
                              <Link
                                title={blog.title}
                                key={index}
                                href={`/${sanitizeUrl(
                                  blog.category
                                )}/${sanitizeUrl(blog.title)}`}
                                className="group"
                              >
                                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                                  <Image
                                    title={blog.title || "Blog Image"}
                                    src={`${imagePath}/${blog?.image}`}
                                    alt={blog.title}
                                    width={300}
                                    height={200}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <h4 className="mt-3 text-sm font-medium group-hover:text-text transition-colors">
                                  {blog.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  {blog.date}
                                </p>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>

            {/* Search Component */}
            <div className="relative cursor-pointer p-2">
              <div
                onClick={handleToggle}
                className="inline-flex items-center gap-2 hover:scale-105 transition-transform px-3 py-1.5 rounded-full border border-transparent hover:border-white/20"
              >
                <Search className={`${className || text} w-4 h-4`} />
                <span
                  className={`hidden md:inline text-xs uppercase ${
                    className || text
                  }`}
                >
                  Search
                </span>
              </div>

              <div
                className={`absolute right-0 top-12 w-80 transition-all duration-300 transform ${
                  isOpen
                    ? "translate-y-0 opacity-100 visible"
                    : "translate-y-4 opacity-0 invisible"
                }`}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search posts..."
                        className="w-full bg-gray-50/50 rounded-lg px-4 py-2.5 pr-10 borde text-black  text-sm outline-none focus:ring-2 focus:ring-text/20"
                        onBlur={(e) => {
                          if (!e.relatedTarget?.closest(".search-results")) {
                            setTimeout(handleBlur, 200);
                          }
                        }}
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {searchQuery && (
                    <div className="search-results max-h-[60vh] overflow-y-auto">
                      {filteredBlogs?.length > 0 ? (
                        filteredBlogs.map((blog, index) => (
                          <Link
                            title={blog.title}
                            key={index}
                            href={`/${sanitizeUrl(blog.category)}/${sanitizeUrl(
                              blog.title
                            )}`}
                          >
                            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors">
                              {blog.image && (
                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    title={blog.title}
                                    src={`${imagePath}/${blog.image}`}
                                    alt={blog.title}
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">
                                  {blog.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {blog.category}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fullcontainer>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isSideNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[400px] bg-primary z-[70] transform transition-transform duration-500 ease-in-out ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 h-full relative">
          <button
            onClick={() => setIsSideNavOpen(false)}
            className="absolute right-8 top-8 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>

          <div className="mt-20 space-y-6">
            <Link
              title="Home"
              href="/"
              className="block text-white text-xl hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              title="Blog"
              href="/blog"
              className="block text-white text-xl hover:text-gray-300"
            >
              Blog
            </Link>
            <Link
              title="Contact"
              href="/contact"
              className="block text-white text-xl hover:text-gray-300"
            >
              Contact
            </Link>
            {categories?.map((item, index) => (
              <Link
                title={item.title}
                key={index}
                href={`/${sanitizeUrl(item.title)}`}
                className="block text-white text-xl hover:text-gray-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
