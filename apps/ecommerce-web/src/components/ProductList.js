import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { fetchProducts } from "ecommerce-commons/services/products";

const ProductList = ({ }) => {
    const [list, setList] = useState([]);
    const productlist = useSelector(state => state.products.list);

    const loadProductList = async () => {
        if (productlist.length > 0) {
            setList(productlist);
        } else {
            const data = await fetchProducts();
            setList(data);
        }
    }

    useEffect(() => loadProductList(), []);
    return (
        <section className="px-10 pt-10 pb-4">
            <div className="flex flex-wrap justify-between">
                {list.map((product) => <ProductCard key={product.id} {...product} />)}
            </div>
        </section>
    );
};

export default ProductList;