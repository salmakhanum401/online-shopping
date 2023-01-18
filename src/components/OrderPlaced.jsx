import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const OrderPlaced = () => {
    const navigate = useNavigate();
    const {userId}=  useParams();
    return (
        <div className='page-center-align'>
            <div className='h2'>Order Placed.</div>
            <button className='btn btn-primary' onClick={() => navigate(`/orders/${userId}`)}>Go to Order</button>
        </div>
    )
}

export default OrderPlaced