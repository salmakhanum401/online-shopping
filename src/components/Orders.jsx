import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import deleteSingleItem from "./LoginPage"

const Orders = () => {
    const { userId } = useParams();
    const [orders, setOrders] = useState([]);
    const fetchOrders =()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/orders/${userId}`)
        .then((res) => {
            setOrders(res.data.data);
        })
    }
    useEffect(() => {
        fetchOrders();
    }, []);
    
  return (
    <>
    <h3>Orders</h3>
    <div className='d-flex flex-column flex-wrap mt-3' style={{gap: "10px"}}>
            {orders.map((order) => {
                return (
                    <div
                        className="box-shadow d-flex flex-column"
                        key={order._id}
                        style={{padding: 15 }}
                    >
                        {order.products.map((item) => <div className='d-flex justify-content-between'>
                            <div>
                                <img width="20" src={item.imgUrl} alt={item.productName} />
                                <span className='h6'> {item.productName}</span>
                            </div>
                            <span className='h5 ms-5'> &#8377;{item.price}</span>
                            </div>)}
                        <div>
                        </div>
                    </div>
                );
            })}
        </div>
    </>
  )
}

export default Orders;