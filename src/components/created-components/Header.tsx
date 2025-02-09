import React from 'react'
import Image from 'next/image';
import HeaderCategory from './HeaderCategory';

const Header = () => {
    return (
        <div className='border-b-[1px] border-b-zinc-900'>
            <div className='px-5 h-10 lg:px-8 flex justify-between items-center bg-zinc-900 text-zinc-50'>
                {/* <span className='text-[13px] font-medium' >{moment().format("LLLL")}</span> */}
                {/* <div className='flex gap-x-[1px]'>
                    <Link className='w-[37px] h-[35px] flex justify-center items-center bg-zinc-500' href={"#"}><FaFacebookF /></Link>
                    <Link className='w-[37px] h-[35px] flex justify-center items-center bg-zinc-500' href={"#"}><FaInstagram /></Link>
                    <Link className='w-[37px] h-[35px] flex justify-center items-center bg-zinc-500' href={"#"}><AiFillYoutube /></Link>
                </div> */}
            </div>
            <div className='w- relative h-[200px] flex items-center px-5 object-center bg-gradient-to-tr from-zinc-900 to-zinc-300' >
                <Image src={"/image/logo.webp"} height={1000} width={1000} alt='banner' className='h-[180px] w-[180px]' />
            </div>
            <HeaderCategory />
        </div>
    )
}

export default Header