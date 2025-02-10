import React from 'react'
import Content from '@/components/created-components/Content'
import Header from '@/components/created-components/Header'
import Footer from '@/components/created-components/Footer'
import { Metadata } from 'next'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

export async function generateMetadata({ params }: { params: Promise<{ blog_id: string }> }): Promise<Metadata> {
    const blog_id = (await params).blog_id
    const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/current-blog`, {
        headers: {
            "Content-Type": "application/json",
            "blog_id": blog_id
        }
    })
    const data = await response.data.payload

    const key = data.keywords.split(",")
    return {
        title: {
            absolute: `${data.title}-The Political Scene`
        },
        generator: data.author,
        applicationName: "The Political Scene",
        authors: [{
            name: data.author
        }],
        publisher: "The Political Scene",
        description: data.desc,
        formatDetection: {
            email: false,
            address: false,
            telephone: false
        },
        keywords: key,
        openGraph: {
            images: [
                {
                    url: data.coverPhoto
                }
            ]
        }
    }
}

const page = async ({ params }: { params: Promise<{ blog_id: string }> }) => {
    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
    )
}

export default page