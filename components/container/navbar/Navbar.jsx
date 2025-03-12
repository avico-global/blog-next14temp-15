"use client";

import {
  Search,
  Menu as MenuIcon,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Fullcontainer from "../../common/Fullcontainer";
import { sanitizeUrl } from "@/lib/myFun";
import Logo from "./Logo";

const ImageCard = ({ item ,imagePath }) => (
  
  <Link
  title={`${item?.title} - ${item?.article_category}`}
    href={`/${sanitizeUrl(item?.title)}`}
    className="flex flex-col items-center transition-all duration-500"
  >
    <div className="aspect-[4/3] flex items-center justify-center overflow-hidden">
     <Image
        title={item?.title}
        src={`${imagePath}/${item?.image}`}
        alt={item?.title}
        height={170}
        width={230}
        className="object-cover w-full h-full"
      /> 
    </div>
    <div className="mt-2 gap-1 flex flex-col text-center text-primary">
      <p className="text-xs text-primary hover:text-text px-3 font-hanken uppercase font-thin">
        {item?.title}
      </p>
      <p className="text-xs text-text px-3 font-hanken uppercase font-thin">
        {item?.date}
      </p>
    </div>
  </Link>
);


const TabContent = ({ data = [], imagePath }) => {
  return (
    <div className="grid grid-cols-3 gap-5 bg-dropdown w-full">
      {data.length > 0 ? (
        data.map((item, index) => <ImageCard key={index} item={item} imagePath={imagePath} />)
      ) : (
        <p className="text-text text-center col-span-3">No articles found.</p>
      )}
    </div>
  );
};

const Categories = ({ categories, blog_list, imagePath }) => {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const data = blog_list?.filter((item) => item?.article_category === activeTab.title);
  return (
    <div className="w-full mt-8 bg-secondary flex">

      <div className="flex flex-col text-xs border-r border-text/20 px-6 mr-5 w-[230px]">
        {categories.map((tab, index) => (
          <Link
          title={`${tab?.title}`}
            href={`/category/${sanitizeUrl(tab?.title)}`}
            key={index}
            onMouseEnter={() => setActiveTab(tab)}
            className={`text-start py-4 border-b border-text/20 text-xs px-3 font-hanken uppercase font-thin transition-all duration-300 ${
              activeTab === tab ? "text-text font-semibold" : "text-primary"
            }`}
          >
            {tab?.title}
          </Link>
        ))}
      </div>

      <TabContent data={data} imagePath={imagePath}  />
    </div>
  );
};


export default function Navbar({
  logo,
  blog_list,
  imagePath,
  text,
  categories,
}) {
  const liClasses =
    "py-2 text-xs text-primary hover:text-text px-3 font-hanken uppercase font-thin";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

 
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchResultsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target) &&
          !inputRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blog_list?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.article_category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const mycategories = categories.slice(0, 3);
  return (
    <>
      {/* Top Navbar */}
      <Fullcontainer
        className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${
          showNavbar
            ? "bg-white text-black shadow-lg"
            : `bg-transparent ${text} `
        }`}
      >
        <div className="py-4 md:py-[10px] sm:px-5">
          <div className="flex justify-between items-center mx-auto px-5">
            {/* Left Side: Mobile Menu & Branding */}
            <div className="flex justify-between items-center gap-6 text-sm font-semibold">
              <button
                onClick={() => setIsSideNavOpen(true)}
                className="transition-colors duration-300"
                aria-label="Open side navigation"
              >
                <MenuIcon className="w-5 h-5" strokeWidth={1} />
              </button>
              <div
                className={`text-[16px] tracking-[4px] font-ivyMedium font-thin uppercase transition-colors duration-300 ${
                  showNavbar ? "text-primary" : `${text}`
                }`}
              >
                <Logo logo={logo} imagePath={imagePath} />
              </div>
            </div>

            {/* Center Menu (Desktop) */}
            <div className="hidden md:flex justify-between items-center text-md font-semibold">
              <Link
              title="Home"
                href="/"
                className={`py-2 text-xs hover:text-text px-3 font-hanken uppercase font-thin transition-colors duration-300 ${
                  showNavbar ? "text-primary" : `${text}`
                }`}
              >
                Home
              </Link>
              <Link
              title="All Articles"
                href="/allarticles"
                className={`py-2 text-xs hover:text-text px-3 font-hanken uppercase font-thin transition-colors duration-300 ${
                  showNavbar ? "text-primary" : `${text}`
                }`}
              >
                All Articles
              </Link>
              <Link
              title="Contact"
                href="/contact"
                className={`py-2 text-xs hover:text-text px-3 font-hanken uppercase font-thin transition-colors duration-300 ${
                  showNavbar ? "text-primary" : `${text}`
                }`}
              >
                Contact
              </Link>
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="py-4"
              >
                <div className="group py-2 px-3">
                  <div
                    className={`flex text-xs items-center gap-1 font-hanken font-thin uppercase group hover:cursor-pointer transition-colors duration-300 ${
                      showNavbar ? "text-primary" : `${text}`
                    }`}
                  >
                    Categories
                    <ChevronUp className="hidden group-hover:block h-3 w-3" />
                    <ChevronDown className="group-hover:hidden h-3 w-3" />
                  </div>
                  <div
                    className={`absolute top-14 left-[10%] bg-secondary w-[80%] text-black h-[300px] z-10 shadow-2xl transition-all duration-300 ${
                      isDropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-[-10px]"
                    }`}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Categories
                      categories={mycategories}
                      blog_list={blog_list}
                      imagePath={imagePath}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Component */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Type to search..."
                  className={`
                    bg-transparent
                    border-b
                    outline-none
                    text-sm
                    font-hanken
                    transition-all
                    duration-500
                    ${showNavbar 
                      ? "border-primary/20 focus:border-primary placeholder:text-primary/50 text-primary"
                      :`border-white/20 focus:border-primary/10  placeholder:${text} ${text}`
                    }
                    ${isSearchOpen ? "w-[200px] px-4 py-2" : "w-0 px-0 py-2"}
                  `}
                />
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className={`
                    p-2
                    transition-all
                    duration-300
                    ${showNavbar ? "text-primary hover:text-accent" : `${text} hover:text-lavender`}
                    ${isSearchOpen ? "-ml-8" : "ml-0"}
                  `}
                >
                  <Search
                    className={`
                      w-4 
                      h-4 
                      transition-transform 
                      duration-300
                      ${isSearchOpen ? "rotate-90" : "rotate-0"}
                    `}
                    strokeWidth={1.5}
                  />
                </button>
                
                {/* Search Results Dropdown */}
                {isSearchOpen && searchQuery && (
                  <div 
                    ref={searchResultsRef}
                    className="absolute top-full right-0 mt-2 w-[300px] bg-white rounded-lg shadow-xl z-50 border border-lavender"
                  >
                    <div className="search-results max-h-[60vh] overflow-y-auto">
                      {filteredBlogs?.length > 0 ? (
                        filteredBlogs?.map((blog, index) => (
                          <Link
                          title={`${blog?.title} - ${blog?.article_category}`}
                            key={index}
                            href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(blog.title)}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="flex items-start gap-3 p-3 hover:bg-lavender transition-colors">
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
                                <h4 className="text-sm font-medium text-primary">
                                  {blog.title}
                                </h4>
                                <p className="text-xs text-text mt-0.5">
                                  {blog.article_category}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-text">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </Fullcontainer>

      {/* Overlay when side nav is open */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isSideNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      />

      {/* Side Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-[400px] bg-[#1C1C1C] z-[70] transform transition-transform duration-500 ease-in-out overflow-hidden ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 h-full relative flex flex-col">
          {/* Close button */}
          <button
            onClick={() => setIsSideNavOpen(false)}
            className="absolute right-8 top-8 text-white hover:text-gray-300"
            aria-label="Close side navigation"
          >
            <X size={24} />
          </button>

          {/* Side Nav Scrollable Area */}
          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            <div className="space-y-4">
              <h2 className="text-4xl font-ivyMedium my-12 text-white">
                <Logo logo={logo} imagePath={imagePath} />
              </h2>
              <Link
              title="Home"
                href="/"
                className="block py-3 border-y border-white/20 hover:text-text text-2xl font-light text-white"
              >
                Home
              </Link>
              <Link
              title="All Articles"
                href="/allarticles"
                className="block py-3 border-b border-white/20 hover:text-text text-2xl font-light text-white"
              >
                All Articles
              </Link>
              <Link
              title="Contact"
                href="/contact"
                className="block py-3 border-b border-white/20 hover:text-text text-2xl font-light text-white"
              >
                Contact
              </Link>

              {/* Categories Dropdown in SideNav */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="py-3 border-b border-white/20 text-2xl font-light flex items-center justify-between w-full text-white"
                >
                  Categories
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* We remove Next.js Link hydration here */}
                {isCategoriesOpen && (
                  <div className="relative mt-2 w-full">
                    <ul className="text-white text-sm w-full">
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className="block border-b border-white/20 py-2 hover:bg-white/10 transition-colors"
                        >
                          {/* Using a normal <a> to remove Next.js link hydration */}
                          <Link
                          title={`${category?.title}`}
                          href={`/category/${sanitizeUrl(category?.title)}`}>
                            {category?.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
}
