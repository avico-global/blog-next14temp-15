import React from 'react'

export default function Fullcontainer({ children, className }) {
  return (
    <div className={`w-full  ${className}`}>
      {children}
    </div>
  )
}
