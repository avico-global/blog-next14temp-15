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
import image1 from "../../../public/images/section4.1.webp";
import image2 from "../../../public/images/section4.2.webp";
import image3 from "../../../public/images/section4.3.webp";

/* ------------------------------------------------------------
   Randomly incoming data from database
-------------------------------------------------------------*/
const data = [
  {
    title: "Practice a power pose",
    image: image1,
    category: "inspiration",
    date: "May 12, 2024",
  },
  {
    title: "Redefine your self",
    image: image2,
    category: "inspiration",
    date: "September 13, 2024",
  },
  {
    title: "The garden of dream",
    image: image3,
    category: "inspiration",
    date: "December 15, 2024",
  },
  {
    title: "Don't dwell on mistakes",
    image: image3,
    category: "travel",
    date: "May 12, 2024",
  },
  {
    title: "Connect to impress",
    image: image1,
    category: "travel",
    date: "December 15, 2024",
  },
  {
    title: "Explore the unknown",
    image: image2,
    category: "travel",
    date: "June 20, 2024",
  },
  {
    title: "Shadows will fall behind you",
    image: image1,
    category: "personal",
    date: "September 13, 2024",
  },
  {
    title: "Write your own story",
    image: image3,
    category: "personal",
    date: "March 10, 2024",
  },
  {
    title: "Live, Laugh, Love",
    image: image2,
    category: "personal",
    date: "November 5, 2024",
  },
  {
    title: "Innovation in tech",
    image: image1,
    category: "technology",
    date: "January 20, 2024",
  },
  {
    title: "AI changing the world",
    image: image2,
    category: "technology",
    date: "February 11, 2024",
  },
  {
    title: "The future of coding",
    image: image3,
    category: "technology",
    date: "March 30, 2024",
  },
];

// Extract unique categories & slice(0,3)
const uniqueCategories = [...new Set(data.map((item) => item.category))].slice(
  0,
  3
);

/* ------------------------------------------------------------
   Side Nav categories (STATIC, removing Link hydration)
-------------------------------------------------------------*/
const sideNavCategories = [
  { name: "Technology", link: "/categories/technology" },
  { name: "Design", link: "/categories/design" },
  { name: "Business", link: "/categories/business" },
  { name: "Personal", link: "/categories/personal" },
];

/* ------------------------------------------------------------
   Tabs Component
-------------------------------------------------------------*/
const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex flex-col text-xs border-r border-text/20 px-6 mr-5 w-[230px]">
    {uniqueCategories.map((tab, index) => (
      <Link
        href={`/${tab}`}
        key={index}
        onMouseEnter={() => setActiveTab(tab)}
        className={`text-start py-4 border-b border-text/20 text-xs px-3 font-hanken uppercase font-thin transition-all duration-300 ${
          activeTab === tab ? "text-text font-semibold" : "text-primary"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </Link>
    ))}
  </div>
);

/* ------------------------------------------------------------
   ImageCard Component
-------------------------------------------------------------*/
const ImageCard = ({ item }) => (
  <Link
    href={`/${item.category}/${item.title.replace(/\s+/g, "-").toLowerCase()}`}
    className="flex flex-col items-center transition-all duration-500"
  >
    <div className="aspect-[4/3] flex items-center justify-center overflow-hidden">
      <Image
        src={item.image}
        alt={item.title}
        height={170}
        width={230}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="mt-2 gap-1 flex flex-col text-center text-primary">
      <p className="text-xs text-primary hover:text-text px-3 font-hanken uppercase font-thin">
        {item.title}
      </p>
      <p className="text-xs text-text px-3 font-hanken uppercase font-thin">
        {item.date}
      </p>
    </div>
  </Link>
);

/* ------------------------------------------------------------
   TabContent Component
-------------------------------------------------------------*/
const TabContent = ({ activeTab }) => {
  const filteredData = data
    .filter((item) => item.category === activeTab)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-3 gap-5 bg-dropdown w-full">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => <ImageCard key={index} item={item} />)
      ) : (
        <p className="text-text text-center col-span-3">No articles found.</p>
      )}
    </div>
  );
};

/* ------------------------------------------------------------
   Main Categories Component
-------------------------------------------------------------*/
const Categories = () => {
  const [activeTab, setActiveTab] = useState(uniqueCategories[0]);

  return (
    <div className="w-full mt-8 bg-secondary flex">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </div>
  );
};

/* ------------------------------------------------------------
   Navbar Component
-------------------------------------------------------------*/
export default function Navbar({ logo }) {
  const liClasses =
    "py-2 text-xs text-primary hover:text-text px-3 font-hanken uppercase font-thin";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Control navbar visibility on scroll/responsive
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Mobile: Always visible
      if (window.innerWidth < 768) {
        setShowNavbar(true);
        return;
      }
      // On desktop: visible if not at top
      if (currentScrollY === 0) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };
    // Initial state: Hidden on desktop, visible on mobile
    setShowNavbar(window.innerWidth < 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSearchToggle = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSearchBlur = () => {
    if (!inputRef.current?.value) {
      setIsSearchOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission
  };

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <Fullcontainer
        className={`fixed top-0 left-0 w-full bg-white text-black shadow-lg transition-all duration-[600ms] z-50 ${
          showNavbar
            ? "opacity-100 translate-y-0"
            : "md:opacity-0 md:-translate-y-full"
        }`}
      >
        <div className="py-4 md:py-[10px] sm:px-5">
          <div className="flex justify-between items-center mx-auto text-black px-5">
            {/* Left Side: Mobile Menu & Branding */}
            <div className="flex justify-between items-center gap-6 text-sm font-semibold">
              <button
                onClick={() => setIsSideNavOpen(true)}
                className="text-black"
                aria-label="Open side navigation"
              >
                <MenuIcon className="w-5 h-5" strokeWidth={1} />
              </button>
              <Link
                href="/"
                className="text-primary text-[16px] tracking-[4px] font-ivyMedium font-thin uppercase"
              >
                {/* Dynamic Logo */}
                {logo}
              </Link>
            </div>

            {/* Center Menu (Desktop) */}
            <div className="hidden md:flex justify-between items-center text-md font-semibold">
              <Link href="/" className={liClasses}>
                Home
              </Link>
              <Link href="/blog" className={liClasses}>
                Blog
              </Link>
              <Link href="/contact" className={liClasses}>
                Contact
              </Link>
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="py-4"
              >
                <div className="group py-2 bg-transparent px-3">
                  <div className="flex text-xs items-center gap-1 font-hanken font-thin uppercase group hover:cursor-pointer">
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
                    <Categories />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Search Icon */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type to search..."
                  className={`
                    bg-transparent
                    border-b
                    border-primary/20
                    focus:border-primary
                    outline-none
                    text-sm
                    font-hanken
                    transition-all
                    duration-500
                    placeholder:text-primary/50
                    ${isSearchOpen ? "w-[200px] px-4 py-2" : "w-0 px-0 py-2"}
                  `}
                  onBlur={handleSearchBlur}
                />
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className={`
                    p-2
                    transition-all
                    duration-300
                    hover:text-text
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
              </form>

              {/* Search Results Dropdown - Add if needed */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-[300px] bg-white shadow-lg rounded-md overflow-hidden opacity-0 transition-opacity duration-300">
                  {/* Add search results here if needed */}
                </div>
              )}
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
                ISABELLE ROCHE
              </h2>
              <Link
                href="/"
                className="block py-3 border-y border-white/20 hover:text-text text-2xl font-light text-white"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="block py-3 border-b border-white/20 hover:text-text text-2xl font-light text-white"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block py-3 border-b border-white/20 hover:text-text text-2xl font-light text-white"
              >
                Contact
              </Link>
              <Link
                href="/shop"
                className="block py-3 border-b border-white/20 hover:text-text text-2xl font-light text-white"
              >
                Shop
              </Link>
              <Link
                href="/pages"
                className="py-3 border-b border-white/20 hover:text-text text-2xl font-light text-white flex items-center justify-between"
              >
                Pages
                <ChevronDown size={16} />
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
                      {sideNavCategories.map((category, index) => (
                        <li
                          key={index}
                          className="block border-b border-white/20 py-2 hover:bg-white/10 transition-colors"
                        >
                          {/* Using a normal <a> to remove Next.js link hydration */}
                          <a href={category.link}>{category.name}</a>
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
