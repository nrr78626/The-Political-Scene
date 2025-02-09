"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoClose } from "react-icons/io5"
// import { BsList } from "react-icons/bs"

const HeaderCategory = () => {
    const path = usePathname()
    const [show, setShow] = useState(false)
    // const [catShow, setCatShow] = useState(false)

    return (
        <div className='w-full text-sm'>
            <div className='bg-zinc-900 text-white uppercase font-semibold relative'>
                <div className='px-8 flex justify-between items-center relative h-[48px] '>
                    {/* <div className={`text-2xl flex lg:hidden font-bold h-full w-[48px] cursor-pointer justify-center items-center ${catShow ? "bg-amber-700" : ""} hover:bg-amber-800 text-white`} onClick={() => { setCatShow(!catShow) }}>
                        <BsList />
                    </div> */}
                    <div className='flex-wrap hidden lg:flex '>
                        <Link href={"/"} className={`px-6 py-[13px] font-medium ${path === "/" ? "bg-amber-700 text-white" : ""}`} >Home</Link>
                        {/* <Link href={"/blog"} className={`px-6 py-[13px] font-medium ${path === "/blog" ? "bg-amber-700 text-white" : ""}`} >Sport</Link>
                        <Link href={"/history"} className={`px-6 py-[13px] font-medium ${path === "/history" ? "bg-amber-700 text-white" : ""}`} >Education</Link>
                        <Link href={"/committe"} className={`px-6 py-[13px] font-medium ${path === "/committe" ? "bg-amber-700 text-white" : ""}`} >Travel</Link>
                        <Link href={"/gallery"} className={`px-6 py-[13px] font-medium ${path === "/gallery" ? "bg-amber-700 text-white" : ""}`} >Health</Link>
                        <Link href={"/about-us"} className={`px-6 py-[13px] font-medium ${path === "/about-us" ? "bg-amber-700 text-white" : ""}`} >Technology</Link>
                        <Link href={"/contact"} className={`px-6 py-[13px] font-medium ${path === "/contact" ? "bg-amber-700 text-white" : ""}`} >Politics</Link> */}
                    </div>
                    <div className='h-full w-[48px] '>
                        <div className={`text-xl ${show ? "bg-amber-700 " : ""} font-bold h-full w-full flex justify-center items-center cursor-pointer hover:bg-amber-800 text-white`} onClick={() => setShow(!show)} >
                            {
                                show ? <IoClose /> : <AiOutlineSearch />
                            }
                        </div>
                        <div className={`absolute lg:block transition-all text-amber-700 z-20 shadow-lg lg:right-10 top-[50px] w-full lg:w-[300px] right-0  ${show ? "visible" : "invisible"}`}>
                            <div className='p-3 bg-white'>
                                <div className='flex'>
                                    <div className='w-[calc(100%-45px)] h-[40px]'>
                                        <input type="text" placeholder='search' className='h-full p-2 border border-amber-400 outline-none w-full bg-amber-100' />
                                    </div>
                                    <div className='w-[45px] hover:bg-abmer-800 cursor-pointer h-[40px] flex justify-center items-center bg-amber-700 text-xl text-amber-50'>
                                        <AiOutlineSearch />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCategory