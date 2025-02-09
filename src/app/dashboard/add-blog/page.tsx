"use client"
import React, { useState, useRef } from 'react'
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/ApiResponse'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, CloudUpload, Clipboard } from 'lucide-react'
import JoditEditor from '@/components/created-components/JoditEditor'
import Title from '@/components/created-components/Title'

const page = () => {
    const { toast } = useToast()
    const router = useRouter()
    const editor = useRef(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuther] = useState("")
    const [img, setImg] = useState("")
    const [image, setImage] = useState("")
    const [desc, setDesc] = useState("")
    const [generateImage, setGenerateImage] = useState("")
    const [generatedImage, setGeneratedImage] = useState("")
    const [keywords, setKeywords] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isImageUploading, setIsImageUploading] = useState(false)

    const handleOnSubmit = async (e: any) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData()
        formData.append("title", title)
        formData.append("desc", desc)
        formData.append("content", content)
        formData.append("coverPhoto", image)
        formData.append("author", author)
        formData.append("category", category)
        formData.append("keywords",keywords)
        try {
            const response = await axios.post<ApiResponse>("/api/create-blog", formData)
            toast({
                title: "Added",
                description: response.data.message
            })
            router.replace("/dashboard")
        } catch (error) {
            console.log("Unable to upload blog", error)
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Uploading failed",
                description: errorMessage
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOnChange = (e: any) => {
        const { files } = e.target
        if (files.length > 0) {
            setImg(URL.createObjectURL(files[0]))
            setImage(files[0])
        }
    }

    const handleOnChangeGenImage = (e: any) => {
        const { files } = e.target
        if (files.length > 0) {
            setGenerateImage(files[0])
        }
    }

    const handleCopyImageUrl = async () => {
        const link = navigator.clipboard.writeText(generatedImage)
    }

    const handleGenImage = async (e: any) => {
        e.preventDefault()
        setIsImageUploading(true)
        const formData = new FormData()
        formData.append("gblogImage", generateImage)
        try {
            const response = await axios.post<ApiResponse>("/api/generate-blog-image", formData)
            if (response.data.success) {
                const uri: any = response.data.payload
                setGeneratedImage(uri)
            }
            toast({
                title: "Success",
                description: response.data.message
            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Error",
                description: errorMessage
            })
        } finally {
            setIsImageUploading(false)
        }
    }
    return (
        <div className='w-full flex-wrap'>
            <Title title='Add Blog' />
            <form onSubmit={handleOnSubmit} className='mt-10 text-sm px-10'>
                <div className='flex flex-col gap-y-3 mb-3'>
                    <label htmlFor="title" className='font-semibold text-zinc-600'>Title</label>
                    <input type="text" value={title} name='title' onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='px-3 py-2 rounded-md outline-0 border border-zinc-400 focus:border-zinc-700 h-10' />
                </div>
                <div className='flex flex-col gap-y-3 mb-3'>
                    <label htmlFor="desc" className='font-semibold text-zinc-600'>Description</label>
                    <textarea name="desc" value={desc} id="" cols={30} rows={10} onChange={(e) => setDesc(e.target.value)} className='px-3 py-2 rounded-md outline-0 border border-zinc-400 focus:border-zinc-700'></textarea>
                </div>
                <div className='flex flex-col gap-y-3 mb-3'>
                    <label htmlFor="auther" className='font-semibold text-zinc-600'>Author</label>
                    <input type="text" value={author} name='auther' onChange={(e) => setAuther(e.target.value)} placeholder='Author' className='px-3 py-2 rounded-md outline-0 border border-zinc-400 focus:border-zinc-700 h-10' />
                </div>
                <div className='flex flex-col gap-y-3 mb-3'>
                    <label htmlFor="auther" className='font-semibold text-zinc-600'>Category</label>
                    <input type="text" value={category} name='auther' onChange={(e) => setCategory(e.target.value)} placeholder='Author' className='px-3 py-2 rounded-md outline-0 border border-zinc-400 focus:border-zinc-700 h-10' />
                </div>

                <div className='flex flex-col text-sm font-semibold text-zinc-600 gap-y-3 mb-3'>
                    <label htmlFor="image" className={`w-full h-[250px] flex rounded text-zinc-600 justify-center items-center cursor-pointer border-2 border-dashed`}>
                        {
                            img ? <img src={img} alt="img" className='h-full w-full' /> : <div className='flex justify-center items-center flex-col gap-y-2'>
                                <span className='text-xl'><CloudUpload size={25} /></span>
                            </div>
                        }
                    </label>
                    <input type="file" name='coverPhoto' id='image' className='hidden' onChange={handleOnChange} />
                </div>
                <div className='flex flex-col text-sm font-semibold text-zinc-600 gap-y-3 mb-3'>
                    <label htmlFor="auther" className='font-semibold text-zinc-600'>Generate Image</label>
                    <input type="file" name='gblogImage' onChange={handleOnChangeGenImage} placeholder='Author' className='px-3 py-2 rounded-md outline-0 border border-zinc-400 focus:border-zinc-700 h-10' />
                    <span className='flex justify-between'>
                        Image Link : {generatedImage}
                        <Clipboard className='cursor-pointer' onClick={handleCopyImageUrl} />
                    </span>
                    <Button type='button' onClick={handleGenImage} disabled={isImageUploading}>
                        {
                            isImageUploading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' />...Generating</> : "Generate Image"
                        }
                    </Button>
                </div>
                <div className='flex flex-col text-sm font-semibold text-zinc-600 gap-y-3 mb-3'>
                    <label htmlFor="auther" className='font-semibold text-zinc-600'>Add Keywords</label>
                    <textarea name="keywords" value={keywords} id="" cols={30} rows={10} onChange={(e) => setKeywords(e.target.value)} className='px-3 py-2 rounded-md outline-0 border border-zinc-400 focus:border-zinc-700'></textarea>
                </div>
                <div className='flex flex-col gap-y-3 mb-3'>
                    <label htmlFor="auther" className='font-semibold text-zinc-600'>Content</label>
                    <JoditEditor editor={editor} content={content} setContent={setContent} />
                </div>
                <Button type='submit' disabled={isSubmitting} className='w-full'>
                    {
                        isSubmitting ? (<><Loader2 className='mr-4 h-4 w-4 animate-spin' />Please wait</>) : ("Submit")
                    }
                </Button>
            </form>
        </div>
    )
}

export default page
