import { createCart } from 'ecommerce-commons/services/cart';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import moment from "moment";
import { cartRequest } from 'ecommerce-commons/redux/reducers/CartSlice';
import { View, Text, Button } from "react-native";

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
    }, [list]);

    return (
        <View>
            <Text style={{ fontWeight: 'bold' }}>Precio Total:{totalPrice}</Text>
            {
                showSuccessAlert === false && (
                    <View>
                        <Text>Algo a fallado con tu pedido. Intentalo de nuevo.</Text>
                    </View>
                )
            }
            {
                showSuccessAlert === true && (
                    <View>
                        <Text>
                            Tu pedido se ha procesado correctamente.
                        </Text>
                    </View>
                )
            }
            <Button
                onPress={() => createNewCart()}
                title='Pagar'

            />
        </View>
    );
};

export default CartPayment;