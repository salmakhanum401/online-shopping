import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import deleteSingleItem from "./LoginPage"

const Cart = () => {
    const { userId } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const fetchCartItems =()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/cart/${userId}`)
        .then((res) => {
            setCartItems(res.data.data);
        })
    }
    useEffect(() => {
        fetchCartItems();
    }, []);

    const deleteSingleItem =(cartId)=>{
        axios.delete(`${process.env.REACT_APP_API_URL}/cart/${userId}/${cartId}`)
        .then(() => {
            fetchCartItems();
        })
    }

    const buyNow = ()=>{
        const productIds = cartItems.map(item => item.product._id);
        axios.post(`${process.env.REACT_APP_API_URL}/orders`, {
            userId,
            products : productIds
        })
        .then(()=>{
            axios.delete(`${process.env.REACT_APP_API_URL}/cart/${userId}`)
            .then(()=>{
                console.log("deleted");
            });
            navigate(`/ordersPlaced/${userId}`)
        })
    }
  return (
    <>
    <h3>Cart Items</h3>
    <div className='d-flex flex-column flex-wrap mt-3' style={{gap: "10px"}}>
            {cartItems.map((item) => {
                return (
                    <div
                        className="cursor-pointer box-shadow d-flex align-items-center justify-content-between"
                        key={item.product._id}
                        style={{padding: 15 }}
                    >
                        <div>
                            <img width="100" src={item.product.imgUrl} alt={item.product.productName} />
                            <span className='h6'> {item.product.productName}</span>

                        </div>
                        <div>
                            <span className='h3 me-3'> &#8377;{item.product.price}</span>
                            <button className='btn-danger btn' onClick={()=> deleteSingleItem(item._id)}>Remove</button>
                        </div>
                    </div>
                );
            })}
        </div>
        <button onClick={buyNow} className='btn btn-primary mt-5'>Buy Now</button>
    </>
  )
}

export default Cart