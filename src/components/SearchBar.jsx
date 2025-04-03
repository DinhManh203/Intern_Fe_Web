import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import {useLocation} from 'react-router-dom'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true);
        }
        else{
            setVisible(false)
        }
    },[location]);

    return showSearch && visible ? (
        <div className="border-b-gray-300 bg-gray-200 py-4 flex flex-col items-center relative transition-all duration-200">
            {/* Ô tìm kiếm */}
            <div className="flex items-center w-3/4 sm:w-1/2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-sm text-gray-700"
                    type="text"
                    placeholder="Search for products..."
                />
                <img src={assets.search_icon} alt="Search" className="w-5 opacity-60" />
            </div>

            {/* Nút đóng */}
            <img
                onClick={() => setShowSearch(false)}
                src={assets.cross_icon}
                alt="Close"
                className="w-4 cursor-pointer absolute top-[25px] right-5 opacity-70 hover:opacity-100 transition-opacity"
            />
        </div>
    ) : null;
};

export default SearchBar;
