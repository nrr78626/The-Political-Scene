import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogs = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/create-blog`, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await allBlogs.data.payload

  const blogEntries: MetadataRoute.Sitemap = data.map((itm: any) => ({
    url: `${process.env.NEXT_PUBLIC_HOST}/Blogs/${itm._id}`,
    lastModified: new Date(itm.updatedAt)
  }))
  return [
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/`,
      lastModified: new Date()
    },
    ...blogEntries,
  ]
}

export const dynamic = 'force-dynamic'