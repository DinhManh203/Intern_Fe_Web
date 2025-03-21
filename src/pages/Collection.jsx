import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    setFilterProducts(products);
  }, [])

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-sm ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" name="" id="" className='w-3' value={'Men'} onChange={toggleCategory} />
              Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" id="" className='w-3' value={'Women'} onChange={toggleCategory} />
              Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" id="" className='w-3' value={'Kids'} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 rounded-sm ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" name="" id="" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />
              T-Shirt
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" id="" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />
              Trousers
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" id="" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />
              Jacket
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center text-base sm:text-2xl mb-4 gap-2 sm:gap-4'>
          {/* Tiêu đề */}
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Bộ lọc sắp xếp */}
          <div className="relative">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-gray-300 text-sm sm:text-base px-3 py-2 rounded-md shadow-sm cursor-pointer transition-all bg-white"
            >
              <option value="relavent" className="py-2 px-3 hover:bg-gray-200 text-gray-700">
                Sort by: Relevant
              </option>
              <option value="low-high" className="py-2 px-3 hover:bg-gray-200 text-gray-700">
                Sort by: Low to High
              </option>
              <option value="high-low" className="py-2 px-3 hover:bg-gray-200 text-gray-700">
                Sort by: High to Low
              </option>
            </select>
          </div>
        </div>


        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">No Data</p>
          )}
        </div>

      </div>

    </div>
  )
}

export default Collection
