import Footer from '@/components/created-components/Footer'
import Header from '@/components/created-components/Header'
import Signup from '@/components/created-components/Signup'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full'>
      <Header />
      <div className='h-full w-full'>
        <Signup />
      </div>
      <Footer />
    </div>
  )
}

export default page