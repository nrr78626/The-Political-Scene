import Footer from "@/components/created-components/Footer";
import Header from "@/components/created-components/Header";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export async function generateStaticParams(){
  const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/create-blog`,{
    headers:{
      "Content-Type":"application/json"
    }
  })
  const data = await response.data.payload.slice(0,10)

  return data.map((id:any)=> id)
}

export async function generateMetadata(): Promise<Metadata> {
  const allBlogs = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/create-blog`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await allBlogs.data.payload
  let key
  for(let i =0;data.length>i;i++){
    const e = data[i]
    const k = e.keywords.split(",")
    key = k
  }

  return {
    title: {
      absolute: "The Political Scene-Home"
    },
    generator: data.map((item: any) => {
      return item.author
    }),
    applicationName: "The Political Scene",
    authors: [{
      name: data.map((item: any) => {
        return item.author
      })
    }],
    publisher: "The Political Scene",
    description: data?.map((item: any) => {
      return `Categoty=${item.category},Title=${item.title},Description=${item.desc},Content=${item.content}`
    }),
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    keywords:key,
    openGraph: {
      images: [
        {
          url: data?.map((item: any) => {
            return `${item.coverPhoto}`
          })
        }
      ]
    }

  }
}

export default async function Home() {
  const allBlogs = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/create-blog`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await allBlogs.data.payload
  return (
    <main className="bg-zinc-50">
      <Header />
      <div className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap -m-4">
            {data.map((item: any) => {
              return <Link href={`/Blogs/${item._id}`} className="p-4 md:w-1/3" key={item._id}>
                <div className="h-full border-2 border-zinc-200 border-opacity-60 rounded-lg overflow-hidden">
                  <Image className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.coverPhoto} height={1000} width={1000} priority={true} alt="blog" />
                  <div className="p-1 text-justify bg-zinc-200">
                    <h2 className="tracking-widest text-xs title-font font-bold text-red-500 mb-1">{item.category}</h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-2">{item.title}</h1>
                    <p className="leading-relaxed line-clamp-5 text-base">{item.desc}</p>
                    <span className="mb-3 text-xs font-bold">Read more...</span>
                  </div>
                </div>
              </Link>
            })}

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
export const dynamic = 'force-dynamic'