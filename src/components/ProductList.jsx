import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/products`)
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => {
                console.log(Error);
            });
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="d-flex flex-wrap"  style={{ gap: "10px"}}>
            {products.map((product) => {
                return (
                    <div
                        className="cursor-pointer box-shadow"
                        onClick={()=> navigate(`/product/${product._id}`)}
                        key={product._id}
                        style={{  padding: 15, flexBasis: "30%"  }}
                    >
                        <div>
                            <img width="100" src={product.imgUrl} alt={product.productName} />
                        </div>
                        <div>
                            <span className="h6"> {product.productName}</span>
                        </div>
                        <div>
                            <span className="h3"> &#8377;{product.price}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
