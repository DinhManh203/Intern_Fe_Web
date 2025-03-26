import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets'
import { NavLink, Link} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const[visible, setVisible] = useState(false);

    const {setShowSearch, getCartCount} = useContext(ShopContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
            <img
                src={assets.logo}
                className='w-36'
            />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

                <NavLink to='/' className='flex flex-col items-center gap-1 group'>
                    <p>Home</p>
                    <hr className='w-2/4 opacity-0 group-hover:opacity-100 group-hover:w-3/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300' />
                </NavLink>

                <NavLink to='/collection' className='flex flex-col items-center gap-1 group'>
                    <p>Collection</p>
                    <hr className='w-2/4 opacity-0 group-hover:opacity-100 group-hover:w-3/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300' />
                </NavLink>

                <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
                    <p>About</p>
                    <hr className='w-2/4 opacity-0 group-hover:opacity-100 group-hover:w-3/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300' />
                </NavLink>

                <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
                    <p>Contact</p>
                    <hr className='w-2/4 opacity-0 group-hover:opacity-100 group-hover:w-3/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <Link to='/login'>
                        <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                    </Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-10'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className="cursor-pointer hover:text-black">My profile</p>
                            <p className="cursor-pointer hover:text-black">Orders</p>
                            <p className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                    <p className='absolute -right-[5px] -bottom-[5px] w-4 text-center text-white leading-4 bg-black aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>
                <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`fixed top-0 right-0 bottom-0 bg-white shadow-lg transition-all duration-300 ${visible ? 'w-full' : 'w-0'} overflow-hidden`}>
            <div className='flex flex-col h-full text-gray-600'>
                <button 
                    onClick={() => setVisible(false)} 
                    className='flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition'>
                    <img src={assets.dropdown_icon} alt="Back" className='h-4 rotate-180' />
                    <span>Back</span>
                </button>
                <nav className='flex flex-col flex-grow'>
                    <NavLink onClick={()=>setVisible(false)} to='/' className='py-3 pl-6 border-b hover:bg-gray-100 transition'>Home</NavLink>
                    <NavLink onClick={()=>setVisible(false)} to='/collection' className='py-3 pl-6 border-b hover:bg-gray-100 transition'>Collection</NavLink>
                    <NavLink onClick={()=>setVisible(false)} to='/about' className='py-3 pl-6 border-b hover:bg-gray-100 transition'>About</NavLink>
                    <NavLink onClick={()=>setVisible(false)} to='/contact' className='py-3 pl-6 hover:bg-gray-100 transition'>Contact</NavLink>
                </nav>
            </div>
        </div>

        </div>
    )
}

export default Navbar
