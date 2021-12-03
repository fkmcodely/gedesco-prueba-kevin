import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductList';
import { productRequest } from 'ecommerce-commons/redux/reducers/ProductsSlice';

const ProductList = ({ }) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.products.list);

    useEffect(() => dispatch(productRequest()), []);

    return (
        <section className="px-10 pt-10 pb-4">
            <div>
                <h2>Listado de productos:</h2>
            </div>
            <div className="flex flex-wrap justify-between">
                {list.length && list?.map((product) => <ProductCard key={product.id} {...product} />)}
            </div>
        </section>
    );
};

export default ProductList;