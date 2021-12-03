import React from 'react';
import { useNavigate } from 'react-router';

const ProductCard = ({ title, id, price, category, description, image }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 w-1/6 m-1">
            <img src={image} className="w-full h-40" alt='' />
            <div className="p-2">
                <h4 className="text-sm font-sans">{title}</h4>
                <h4 className="text-xs font-sans text-red-600">{price} </h4>
                <button
                    onClick={() => {
                        navigate(`/product/${id}`)
                    }}
                    className="bg-yellow-500 p-2 w-full mt-5 font-sans">
                    VER PRODUCTO
                </button>
            </div>
        </div>
    );
};

export default ProductCard;