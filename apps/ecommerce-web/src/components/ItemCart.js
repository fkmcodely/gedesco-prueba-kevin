import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productRequest } from 'ecommerce-commons/redux/reducers/ProductsSlice';
import { addProduct, deleteProduct } from 'ecommerce-commons/redux/reducers/CartSlice';

const ItemCart = ({ productId }) => {
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState();
    const dispatch = useDispatch();

    const list = useSelector(state => state.cart.products) || [];
    const productList = useSelector(state => state.products.list);

    useEffect(() => {
        productList.forEach((product) => {
            if (product.id === productId) {
                setProduct(product);
            };
        });
    }, [productId])

    useEffect(() => {
        list.forEach((product) => {
            if (product.productId === productId) {
                setQuantity(product.quantity);
            };
        });
    }, [productId, list]);
    useEffect(() => dispatch(productRequest()), []);

    return (
        <div className="flex pt-5 pb-5 pl-2 bg-gray-200 mt-10 mb-5">
            <div className="flex justify-beetwen w-9/12 justify-between	pr-10">
                <p>Titulo: {product?.title}</p>
                <p>Precio: {product?.price}</p>
                <p>Cantidad: {quantity}</p>
            </div>
            <div className="flex justify-beetwen w-3/12">
                {console.log(productId)}
                <button
                    className="bg-green-400 p-2"
                    onClick={() => dispatch(addProduct(product))}>
                    Añadir
                </button>
                <button
                    onClick={() => dispatch(deleteProduct(product))}
                    className="bg-red-400 p-2">
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ItemCart;