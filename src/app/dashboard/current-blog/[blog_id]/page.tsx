"use client"
import Title from '@/components/created-components/Title'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from "moment"
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

const page = () => {
    const router = useRouter()
    const { blog_id }: any = useParams()
    const [blog, setBlog] = useState<any>()

    const handleOnDelete = async () => {
        const response = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/current-blog`, {
            headers: {
                "Content-Type": "application/json",
                "blog_id": blog_id
            }
        })
        const json = await response.data
        if (json.success) {
            router.replace("/dashboard")
        }
    }


    useEffect(() => {
        const getCurrentBlog = async () => {
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
            }
        }
        getCurrentBlog()
    }, [])

    return (
        <div>
            {
                !blog ? <div className='w-full h-full flex items-center justify-center'><Loader2 className='h-8 w-8 animate-spin' /></div> : <div className='w-full text-zinc-900'>
                    <Title title={blog?.title} />
                    <div className='mb-5 mt-10'>
                        {
                            blog?.coverPhoto ? <Image src={blog?.coverPhoto} height={1000} width={1000} alt='cover photo' priority={true} /> : <Skeleton />
                        }
                    </div>
                    <p className='my-5'>{blog?.desc}</p>
                    <div className='p-5'>
                        <div dangerouslySetInnerHTML={{ __html: blog?.content }} className='text-justify'>

                        </div>
                        <div className='text-xs font-bold gap-5 flex justify-between items-center mt-10'>
                            <div>
                                <Button variant={"outline"} onClick={handleOnDelete} className='transition-all duration-300 hover:bg-red-500 hover:text-white' >Delete</Button>
                            </div>
                            <div>
                                <span>{blog?.author}</span>
                                {moment(blog?.createdAt).format("LLLL")}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default page