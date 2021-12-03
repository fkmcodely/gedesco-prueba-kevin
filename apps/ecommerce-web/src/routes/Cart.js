import React from 'react';
import { useSelector } from 'react-redux';
import CartPayment from '../components/CartPayment';
import ItemCart from '../components/ItemCart';

const Cart = () => {
    const cartProducts = useSelector(state => state.cart.products);

    return (
        <section className="px-10 pt-10 pb-4 w-50 flex ">
            <div className="w-3/5 bg-ecommerce-primary">
                <h2 className="pl-4 text-2xl">Listado de tu carrito</h2>
                <div>
                    {
                        cartProducts?.map((item) => <ItemCart productId={item.productId} />)
                    }
                    {cartProducts.length === 0 && <h2 className="pl-4 mt-10 text-2xl">
                        Tu carrito esta vacio</h2>}
                </div>
            </div>
            <div className="w-2/5 p-4 bg-gray-200">
                <h2 className="text-2xl ">Carrito</h2>
                {cartProducts.length === 0 ? <h2 className="pl-4 mt-10 text-2xl">
                    Tu carrito esta vacio</h2> : <CartPayment list={cartProducts} />}
            </div>
        </section>
    );
};

export default Cart;