import { createCart } from 'ecommerce-commons/services/cart';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import moment from "moment";
import { cartRequest } from 'ecommerce-commons/redux/reducers/CartSlice';

const CartPayment = ({ list }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState();
    const productList = useSelector(state => state.products.list);
    const listCart = useSelector(state => state.cart.products);
    const user = useSelector(state => state.user.userInfo);

    const [showSuccessAlert, setShowSuccessAlert] = useState(null);

    const createNewCart = async () => {
        const cart = {
            userId: user.id,
            date: moment().format('YYYY-MM-dd'),
            products: listCart
        }
        try {
            const cartReq = await createCart(cart);
            setShowSuccessAlert(cartReq ? true : false);
            setTimeout(() => {
                setShowSuccessAlert(null);
                dispatch(cartRequest());
                navigate('/');
            }, 3000);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        let totalQuantityCart = 0;
        list.map((product) => {
            const productSelected = productList.filter((productItem) => productItem.id === product.productId);
            totalQuantityCart = totalQuantityCart + (product.quantity * productSelected[0].price)
        });
        setTotalPrice(totalQuantityCart);
    }, [list])

    return (
        <div className="pd-4  pb-4">
            {
                list.map((product, index) => {
                    const productSelected = productList.filter((productItem) => productItem.id === product.productId);

                    return (
                        <div className="flex border-gray-500 border-2 mb-5">
                            <p>{index}.{productSelected[0].title}</p>
                            <p>Total: {product.quantity * productSelected[0].price}$</p>
                        </div>
                    )
                })
            }
            <p>Precio Total:{totalPrice}</p>
            {
                showSuccessAlert === false && (
                    <div>
                        Algo a fallado con tu pedido. Intentalo de nuevo.
                    </div>
                )
            }
            {
                showSuccessAlert === true && (
                    <div className="bg-green-800">
                        <p>
                            Tu pedido se ha procesado correctamente.
                        </p>
                    </div>
                )
            }
            <button
                onClick={() => createNewCart()}
                className="p-2 bg-blue-300 w-full mt-10"
            >PAGAR</button>

        </div>
    );
};

export default CartPayment;