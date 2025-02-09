import Footer from '@/components/created-components/Footer'
import Header from '@/components/created-components/Header'
import React from 'react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-full h-full'>
            <Header />
            <div className='w-full h-full'>
                <div className='px-40 py-10 flex items-center justify-center gap-4'>
                    <h1 className='text-6xl font-semibold text-zinc-600'>404</h1>
                    <span className='text-2xl text-zinc-600'>page not found</span>
                </div>
                <Link href="/">Return Home</Link>
            </div>
            <Footer />
        </div>
    )
}
