import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} alt="" className='mb-5 w-32' />
          <p className='w-full md:w-2/3 text-gray-600'>
            We are committed to delivering high-quality products and exceptional service.
            Our goal is to create a seamless and satisfying experience for every customer.
            Thank you for trusting us!
          </p>

        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Phone : +84 - 12345-6789</li>
            <li>Email: manhdinh0410@gmail.com</li>
          </ul>
        </div>


      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ manhdinh.com - All Right Reserved</p>
      </div>

    </div>
  )
}

export default Footer
