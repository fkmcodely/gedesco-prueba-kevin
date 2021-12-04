import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from "ecommerce-commons/services/products";
import { addProduct } from 'ecommerce-commons/redux/reducers/CartSlice';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const productlist = useSelector(state => state.products.list);
    const dispatch = useDispatch();

    const getProduct = async () => {
        if (productlist.length > 0) {
            productlist.map((product) => {
                if (product.id === parseInt(id)) {
                    setProduct(product);
                }
            });
        } else {
            const product = await fetchSingleProduct(id);
            setProduct(product);
        }
    };

    useEffect(() => getProduct(), []);

    return (
        <section className="px-10 pt-20 pb-4 w-50 flex">
            <img src={product?.image} alt="product-image" className="w-52" />
            <div className="w-50 pl-20">
                <h1 className="text-3xl">{product?.title}</h1>
                <h3 className="text-xl">{product?.category}</h3>
                <p>Valoracion media: {product?.rating.rate}%</p>
                <p>{product?.description}</p>
                <button
                    onClick={() => {
                        dispatch(addProduct(product))
                    }}
                    className="bg-blue-600 mt-10 p-4">Añadir al carrito</button>
            </div>
        </section>
    );
};

export default Product;