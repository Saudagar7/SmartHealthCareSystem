import React from 'react'

export default function Card({ children, className = '' }){
  return (
    <div className={`card rounded-3xl bg-white text-[#0f2418] border border-[#d5ecdf] p-6 shadow-[0_12px_30px_rgba(15,36,24,0.08)] transition-shadow hover:shadow-[0_18px_36px_rgba(15,36,24,0.12)] ${className}`}>
      {children}
    </div>
  )
}
