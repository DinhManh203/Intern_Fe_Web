import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({
      ...data, [name]: value
    }))
  }

  const onSubmitHandler = async (event) => {

    event.preventDefault()
    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        // API Calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          console.log(response.data);
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if(responseStripe.data.success){
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }

          break;

        default:
          break;

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            type="text"
            className="border border-gray-300 rounded py-1 px-3 w-full"
            placeholder="First name"
            required
          />
          <input
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            type="text"
            className="border border-gray-300 rounded py-1 px-3 w-full"
            placeholder="Last name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          type="email"
          className="border border-gray-300 rounded py-1 px-3 w-full"
          placeholder="Email address"
          required
        />
        <input
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          type="text"
          className="border border-gray-300 rounded py-1 px-3 w-full"
          placeholder="Street address"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            type="text"
            className="border border-gray-300 rounded py-1 px-3 w-full"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            type="text"
            className="border border-gray-300 rounded py-1 px-3 w-full"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            type="number"
            className="border border-gray-300 rounded py-1 px-3 w-full"
            placeholder="Zipcode"
            required
          />
          <input
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            type="text"
            className="border border-gray-300 rounded py-1 px-3 w-full"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          type="number"
          className="border border-gray-300 rounded py-1 px-3 w-full"
          placeholder="Phone"
          required
        />
      </div>

      {/* Right Side */}
      <div className='mt-8'>

        <div className='min-w-80 mt-8'>
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img src={assets.stripe_logo} alt="Stripe Logo" className="h-5 mx-4" />
            </div>
            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img src={assets.razorpay_logo} alt="Razorpay Logo" className="h-5 mx-4" />
            </div> */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
