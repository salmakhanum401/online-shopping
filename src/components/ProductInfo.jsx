import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const ProductInfo = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then((res) => {
                setProduct(res.data.data);
            })
    }, []);

    const addToCart = () => {
        let userId = localStorage.getItem("userId");
        axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
            userId: userId,
            product: product._id
        })
        .then(()=> {
                navigate(`/cart/${userId}`)
        })
        .catch(()=> {
            console.log("error")
        })
    }
    return (
        <div style={{gap: 8}} className='d-flex flex-column'>
            <img width="200" src={product.imgUrl} alt={product.productName} />
            <div className='h5'> {product.productName}</div>
            <div className='h3'> &#8377;{product.price}</div>
            <div className='h6'>Rating: {product.rating}</div>
            <button style={{maxWidth: "15%"}} className='btn btn-warning text-white' onClick={addToCart}>Add to cart</button>
            {/* <button style={{maxWidth: "15%"}} className='btn btn-primary' onClick={addToCart}>Buy</button> */}
            <div>
                <div className='h4'>Description:</div>
                <div>{product.description}</div>
            </div>
        </div>
    )
}

export default ProductInfo