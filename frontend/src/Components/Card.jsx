import React from 'react'

function Card({ title, landmark, image1, image2, image3, rent, city, id }) {

  const images = [image1, image2, image3]

  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex flex-col rounded-lg cursor-pointer shadow-md overflow-hidden'>

      {/* Image Slider (Scroll) */}
      <div className='w-full h-[65%] bg-gray-200 flex overflow-x-auto scroll-smooth no-scrollbar'>

        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="property"
            className='w-full h-full object-cover flex-shrink-0'
          />
        ))}

      </div>

      {/* Content */}
      <div className='p-3 flex flex-col gap-1'>

        <h2 className='text-lg font-semibold text-black truncate'>
          {title}
        </h2>

        <p className='text-gray-600 text-sm'>
          {landmark}, {city}
        </p>

        <p className='text-red-500 font-bold text-lg'>
          ₹{rent} / day
        </p>

      </div>

    </div>
  )
}

export default Card