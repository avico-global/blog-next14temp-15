import Image from 'next/image'
import React from 'react'
import image from '../../../public/images/codesupply.webp';

export default function Card() {
  return (
    <div className="group relative w-[300px]">
      {/* Image container */}
      <div className="relative">
        <Image 
          src={image} 
          className='aspect-square object-cover w-full'
          alt="Code supply"
        />
        
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Inner border with gap */}
        <div className="absolute inset-[10px]">
          <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center">
            {/* Top border */}
            <div className="absolute top-0 left-1/2 w-full h-[1px] bg-white -translate-x-1/2 transform-origin-center" />
            {/* Bottom border */}
            <div className="absolute bottom-0 left-1/2 w-full h-[1px] bg-white -translate-x-1/2 transform-origin-center" />
            {/* Left border */}
            <div className="absolute left-0 top-1/2 h-full w-[1px] bg-white -translate-y-1/2 transform-origin-center" />
            {/* Right border */}
            <div className="absolute right-0 top-1/2 h-full w-[1px] bg-white -translate-y-1/2 transform-origin-center" />
          </div>
        </div>
      </div>
    </div>
  )
} 