import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [size, setSize] = useState('');

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Vui lòng chọn size trước khi thêm vào giỏ hàng!', {
                position: 'top-right',
                autoClose: 2000,
                style: { width: '450px' }
            });
            return;
        }
        // else{
        // addToCart(productData._id, size);
        // toast.success('Sản phẩm đã được thêm vào giỏ hàng!', {
        //     position: 'top-right',
        //     autoClose: 2000,
        //     style: { width: '450px' }
        // });
        // }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }

                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, size, setSize,
        getCartCount,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;
