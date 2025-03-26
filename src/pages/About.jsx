import React from 'react';
import Title from "../components/Title";
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa hic earum tenetur quas cum corporis ex qui fugit explicabo ipsum, debitis quod harum rerum a enim dolorum itaque officia quos.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iure possimus similique expedita exercitationem pariatur sed minima porro cupiditate nobis quibusdam non facilis nam, natus repellat perferendis suscipit dolore est?</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quas saepe sunt soluta. Placeat, provident dolore minus officiis natus blanditiis id eos nulla a maxime rerum cupiditate delectus consequatur officia!</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance: </b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident recusandae iusto, tenetur eveniet aspernatur ipsum consequatur a nisi sunt atque molestias dolor nesciunt officiis dignissimos fugit temporibus excepturi quisquam ea!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident recusandae iusto, tenetur eveniet aspernatur ipsum consequatur a nisi sunt atque molestias dolor nesciunt officiis dignissimos fugit temporibus excepturi quisquam ea!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident recusandae iusto, tenetur eveniet aspernatur ipsum consequatur a nisi sunt atque molestias dolor nesciunt officiis dignissimos fugit temporibus excepturi quisquam ea!</p>
        </div>
      </div>

      <NewsLetterBox />
      
    </div>
  )
}

export default About
