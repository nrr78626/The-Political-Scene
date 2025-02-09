import React from 'react'

const Title = ({title}:{title:string}) => {
  return (
    <div className='text-xl font-bold text-zinc-800 relative before:absolute before:w-[4px] before:bg-zinc-900 before:h-full before:-left-0 pl-3'>
        {title}
    </div>
  )
}

export default Title
