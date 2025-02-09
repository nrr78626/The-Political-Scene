import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

const Blogs = async () => {
    const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/create-blog`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    const json = await response.data.payload
    return (
        <div className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        json.map((item: any) => {
                            return <Link href={`/dashboard/current-blog/${item._id}`} className="p-4 md:w-1/2" key={item._id}>
                                <div className="h-full border-2 border-zinc-200 border-opacity-60 rounded-lg overflow-hidden">
                                    <Image className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.coverPhoto} alt="blog" height={1000} width={1000} />
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{item.category}</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{item.title}</h1>
                                        <p className="leading-relaxed mb-3 text-ellipsis line-clamp-4">{item.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Blogs

export const dynamic = 'force-dynamic'