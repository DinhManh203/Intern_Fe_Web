import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const RelatedProduct = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter(
                (item) => item.category === category && item.subCategory === subCategory
            );

            setRelated(filteredProducts.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.length > 0 ? (
                    related.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProduct;
