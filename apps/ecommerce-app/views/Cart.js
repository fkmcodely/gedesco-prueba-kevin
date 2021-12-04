import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import CartPayment from '../components/CartPayment';
import ItemCart from '../components/ItemCart';
const Cart = () => {
    const cartProducts = useSelector(state => state.cart.products);
    const cart = useSelector(state => state.cart);

    return (
        <SafeAreaView style={styles.viewfix}>
            <ScrollView style={styles.productlist}>
                {
                    cartProducts?.map((item, index) => <ItemCart key={index} productId={item.productId} />)
                }
                <CartPayment list={cartProducts} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    viewfix: {
        flex: 1,
        width: '100%',
    },
    text: {
        fontSize: 42,
    },
    productlist: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default Cart;