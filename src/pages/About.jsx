import React from 'react';
import Title from "../components/Title";
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsletterBox';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FacebookShareButton, PinterestShareButton } from "react-share";
import FacebookOutlined from "@mui/icons-material/FacebookOutlined";
import Pinterest from "@mui/icons-material/Pinterest";
import Instagram from "@mui/icons-material/Instagram";
import "leaflet/dist/leaflet.css";

const About = () => {
  const currentPageUrl = window.location.href;
  const positionHN = [21.0055, 105.8461];

  return (
    <div>
      <div className='text-2xl pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="About Us" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            We are dedicated to providing high-quality products and services that meet the evolving needs of our customers.
            Our team works tirelessly to ensure excellence in every aspect of our business.
          </p>
          <p>
            With a customer-first approach, we strive to create seamless and enjoyable experiences.
            Whether it’s through our products, services, or support, we aim to exceed expectations and build lasting relationships.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to deliver innovative solutions that enhance everyday life.
            We are committed to integrity, quality, and continuous improvement, ensuring that our customers always receive the best.
          </p>
          <div>
            <b>Help us</b>
            <div>
              <FacebookShareButton url={currentPageUrl}>
                <button className="bg-blue-500 text-center text-white p-1 rounded-md mt-4">
                  <FacebookOutlined />
                </button>
              </FacebookShareButton>

              <PinterestShareButton url={currentPageUrl}>
                <button className="bg-red-500 text-center text-white p-1 rounded-md mt-4 ml-2">
                  <Pinterest />
                </button>
              </PinterestShareButton>

              <button
                className="bg-pink-500 text-center text-white p-1 rounded-md mt-4 ml-2"
                url={currentPageUrl}
              >
                <Instagram />
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance: </b>
          <p className='text-gray-600'>
            We are committed to delivering high-quality products that undergo strict inspections to ensure customer satisfaction.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-600'>
            Our services save you time and effort, providing maximum convenience in every transaction and shopping experience.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-600'>
            Our dedicated support team is always ready to listen and resolve any concerns to ensure the best customer experience.
          </p>
        </div>
      </div>


      {/* Our Location Section */}
      <div className='text-xl py-4'>
        <Title text1={'OUR'} text2={'LOCATIONS'} />
      </div>

      <div className='mb-20'>
        <MapContainer center={positionHN} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={positionHN}>
            <Popup>Ng. 105 Bạch Mai/63 Ng. Đình Đông, Bạch Mai, Hai Bà Trưng, Hà Nội 100000, Việt Nam</Popup>
          </Marker>
        </MapContainer>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
