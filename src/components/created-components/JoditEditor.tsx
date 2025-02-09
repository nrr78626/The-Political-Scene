"use client"
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
const Jodit = dynamic(() => import("jodit-react"), { ssr: false })

const JoditEditor = ({editor,setContent,content}:any) => {
    const config = useMemo(() => ({
        uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
        }
    }), [])

    return (
        <div className='flex items-start justify-center text-wrap'>
            <Jodit
                ref={editor}
                value={content}
                onChange={() => { }}
                onBlur={newContent=>setContent(newContent)}
                className='w-screen'
            />
        </div>
    )
}

export default JoditEditor
