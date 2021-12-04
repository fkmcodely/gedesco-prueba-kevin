import React, { useState, useEffect } from 'react';
import { getCartByUser } from 'ecommerce-commons/services/cart';
import { useSelector } from 'react-redux';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const idUser = useSelector(state => state.user.userInfo?.id);
    useEffect(async () => {
        const orderes = await getCartByUser(idUser);
        setOrders(orderes);
    }, []);

    return (
        <section className="px-10 pt-10 pb-4">
            <h2>Listado de pedidos</h2>
            <div className="flex flex-wrap justify-between">

            </div>
        </section>
    );
};


export default Orders;