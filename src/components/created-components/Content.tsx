"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Title from './Title'
import Image from 'next/image'
import moment from 'moment'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

const Content = () => {
    const [blog, setBlog] = useState<any>({})
    const { blog_id }: any = useParams()
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        const getCurrentBlog = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/current-blog`, {
                    headers: {
                        "Content-Type": "application/json",
                        "blog_id": blog_id
                    }
                })
                const json = await response.data.payload
                setBlog(json)
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }
        getCurrentBlog()
    }, [])
    
    return (
        <>
            {
                isLoading ? <div className='w-full h-full flex items-center justify-center'><Loader2 className='h-8 w-8 animate-spin' /></div> : <div className='w-full text-zinc-900 px-10 mt-5'>
                    <Title title={blog?.title} />
                    <div className='mb-5 mt-10 flex items-center justify-center'>
                        <Image src={blog?.coverPhoto ? blog?.coverPhoto :"/image/logo.webp"} height={1000} width={1000} alt='cover-photo' className="" priority={true} />
                    </div>
                    <p className='my-5'>{blog?.desc}</p>
                    <div className='p-5'>
                        <div dangerouslySetInnerHTML={{ __html: blog?.content }} className='text-justify'>

                        </div>
                        <div className='text-xs font-bold gap-5 flex justify-between items-center mt-10'>
                            <div>
                                <span>{blog?.author}</span>
                                {moment(blog?.createdAt).format("LLLL")}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Content