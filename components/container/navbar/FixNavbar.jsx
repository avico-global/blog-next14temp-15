import {
  Search,
  Menu,
  ChevronDown,
  ChevronUp,
  MenuIcon,
  SearchIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Fullcontainer from "../../common/Fullcontainer";
import Container from "../../common/Container";
import { useState, useEffect, useRef } from "react";
import image1 from "../../../public/images/section4.1.webp";
import image2 from "../../../public/images/section4.2.webp";
import image3 from "../../../public/images/section4.3.webp";

export default function FixNavbar({ text }) {
  const li = ` py-2 text-xs  ${text} hover:text-text px-3  font-hanken uppercase font-thin `;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      if (window.innerWidth >= 768) {
        // For desktop screens
        if (currentScrollY === 0) {
          // At the top - hide navbar
          setShowNavbar(false);
        } else if (scrollingUp) {
          // Scrolling up - show navbar
          setShowNavbar(false);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and not at top - hide navbar
          setShowNavbar(true);
        }
      } else {
        // For mobile screens - always show navbar
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    // Set initial state based on screen width
    setShowNavbar(window.innerWidth < 768);

    // Handle resize events
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowNavbar(true);
      } else if (window.scrollY === 0) {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const [open, setOpen] = useState(false);
  const categories = [
    {
      name: "Technology",
      link: "/categories/technology",
    },
    {
      name: "Design",
      link: "/categories/design",
    },
    {
      name: "Business",
      link: "/categories/business",
    },
    {
      name: "Personal",
      link: "/categories/personal",
    },
    {
      name: "Technology",
      link: "/categories/technology",
    },
    {
      name: "Design",
      link: "/categories/design",
    },
    {
      name: "Business",
      link: "/categories/business",
    },
    {
      name: "Personal",
      link: "/categories/personal",
    },
    {
      name: "Technology",
      link: "/categories/technology",
    },
    {
      name: "Design",
      link: "/categories/design",
    },
    {
      name: "Business",
      link: "/categories/business",
    },
    {
      name: "Personal",
      link: "/categories/personal",
    },
  ];

  // Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return (
    <>
      <Fullcontainer
        className={`fixed top-0 left-0 w-full bg-transparent text-white  transition-all duration-[600ms] z-30 
          }`}
      >
        <div className="py-4 md:py-[10px] sm:px-5">
          <div
            className={`flex justify-between items-center  mx-auto ${text} px-5 `}
          >
            <ul className="flex justify-between items-center gap-6 text-sm font-semibold">
              <button onClick={() => setIsSideNavOpen(true)} className="">
                <MenuIcon className="w-5 h-5" strokeWidth={1} />
              </button>
              <Link
                href="/"
                className={` text-[16px] tracking-[4px] font-ivyMedium font-thin uppercase`}
              >
                ISABELLE ROCHE
              </Link>
            </ul>

            <ul className=" hidden  md:flex justify-between items-center text-md font-semibold">
              <Link href="/" className={li}>
                Home
              </Link>
              <Link href="/blog" className={li}>
                Blog
              </Link>
              <Link href="/contact" className={li}>
                Contact
              </Link>
              <div
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="py-4 "
              >
                <div className=" group py-2 bg-transparent text-whit  px-3">
                  <div className="flex text-xs items-center gap-1 font-hanken font-thin uppercase group hover:cursor-pointer">
                    Categories
                    <ChevronUp className="hidden group-hover:block h-3 w-3" />
                    <ChevronDown className="group-hover:hidden h-3 w-3" />
                  </div>
                  <div
                    className={`absolute top-14 left-[10%] bg-secondary w-[80%] text-black h-[300px]  z-10 shadow-2xl transition-all duration-300 ${
                      dropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-[-10px]"
                    }`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Categories />
                  </div>
                </div>
              </div>
            </ul>

            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type to search..."
                  className={`
                    bg-transparent
                    border-b
                    border-white/20
                    focus:border-white
                    outline-none
                    text-sm
                    text-white
                    font-hanken
                    transition-all
                    duration-500
                    placeholder:text-white/50
                    ${isSearchOpen ? 'w-[200px] px-4 py-2' : 'w-0 px-0 py-2'}
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
                    text-white
                    hover:text-text
                    ${isSearchOpen ? '-ml-8' : 'ml-0'}
                  `}
                >
                  <Search 
                    className={`
                      w-4 
                      h-4 
                      transition-transform 
                      duration-300
                      ${isSearchOpen ? 'rotate-90' : 'rotate-0'}
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

      {/* Side Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isSideNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      />

      {/* Side Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-[400px] bg-primary z-[70] transform transition-transform duration-500 ease-in-out overflow-hidden ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 h-full relative flex flex-col">
          {/* Close button */}
          <button
            onClick={() => setIsSideNavOpen(false)}
            className="absolute right-8 top-8 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>

          {/* Navigation Links - Make this section scrollable */}
          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            <div className="space-y-4">
              <h2 className="text-4xl font-ivyMedium text-left my-12 text-white">
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

              <div className="relative">
                {/* Main Link with Dropdown Toggle */}
                <button
                  onClick={() => setOpen(!open)}
                  className="py-3  border-b border-white/20 text-2xl font-light flex items-center justify-between w-full text-white"
                >
                  Categories
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Content */}
                {open && (
                  <div className="relative mt-2 w-full">
                    <ul className="text-white text-sm w-full">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <Link
                            href={category.link}
                            className="block border-b border-white/20 py-2 hover:bg-white/10 transition-colors"
                          >
                            {category.name}
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
    </>
  );
}



// Randomly incoming data from database
const data = [
  { title: "Practice a power pose", image: image1, category: "inspiration", date: "May 12, 2024" },
  { title: "Redefine your self", image: image2, category: "inspiration", date: "September 13, 2024" },
  { title: "The garden of dream", image: image3, category: "inspiration", date: "December 15, 2024" },
  { title: "Don't dwell on mistakes", image: image3, category: "travel", date: "May 12, 2024" },
  { title: "Connect to impress", image: image1, category: "travel", date: "December 15, 2024" },
  { title: "Explore the unknown", image: image2, category: "travel", date: "June 20, 2024" },
  { title: "Shadows will fall behind you", image: image1, category: "personal", date: "September 13, 2024" },
  { title: "Write your own story", image: image3, category: "personal", date: "March 10, 2024" },
  { title: "Live, Laugh, Love", image: image2, category: "personal", date: "November 5, 2024" },
  { title: "Innovation in tech", image: image1, category: "technology", date: "January 20, 2024" },
  { title: "AI changing the world", image: image2, category: "technology", date: "February 11, 2024" },
  { title: "The future of coding", image: image3, category: "technology", date: "March 30, 2024" },
];

// Extract unique categories & slice (0,3)
const uniqueCategories = [...new Set(data.map((item) => item.category))].slice(0, 3);

// Tabs Component
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

// ImageCard Component
const ImageCard = ({ item }) => (
  <Link href={`/${item.category}/${item.title.replace(/\s+/g, "-").toLowerCase()}`} className="flex flex-col items-center transition-all duration-500">
    <div className="aspect-[4/3] flex items-center justify-center overflow-hidden">
      <Image src={item.image} alt={item.title} height={170} width={230} className="object-cover w-full h-full" />
    </div>
    <div className="mt-2 gap-1 flex flex-col text-center text-primary">
      <p className="text-xs text-primary hover:text-text px-3 font-hanken uppercase font-thin">{item.title}</p>
      <p className="text-xs text-text px-3 font-hanken uppercase font-thin">{item.date}</p>
    </div>
  </Link>
);

// TabContent Component (Query + Slice)
const TabContent = ({ activeTab }) => {
  // **Filter current category & take only 3 articles**
  const filteredData = data.filter((item) => item.category === activeTab).slice(0, 3);

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

//  Main Categories Component
const Categories = () => {
  const [activeTab, setActiveTab] = useState(uniqueCategories[0] || "inspiration"); // Default first category

  return (
    <div className="w-full mt-8 bg-secondary flex">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </div>
  );
};


