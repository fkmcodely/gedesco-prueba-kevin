import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productRequest } from 'ecommerce-commons/redux/reducers/ProductsSlice';
import { addProduct, deleteProduct } from 'ecommerce-commons/redux/reducers/CartSlice';
import { StyleSheet, View, Text, Button, Image } from "react-native";

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
        <View style={styles.itemcontainer}>
            <View style={styles.itemImage}>
                <Image source={{ uri: `${product?.image}` }}
                    style={{ width: '100%', height: 100 }} />
            </View>
            <View style={styles.itemSheet}>
                <Text>Titulo: {product?.title}</Text>
                <Text>Precio: {product?.price}</Text>
                <Text>Cantidad: {quantity}</Text>
            </View>
            <View style={styles.itemActions}>
                <Button
                    title='+'
                    color="#74E939"
                    style={styles.button}
                    onPress={() => dispatch(addProduct(product))}
                />
                <Button
                    title='-'
                    color='#EA2121'
                    style={styles.button}
                    onPress={() => dispatch(deleteProduct(product))}
                />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    itemcontainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    itemSheet: {
        width: '50%'
    },
    itemImage: {
        width: '25%',
    },
    itemActions: {
        width: '25%'
    },
    button: {
        width: '30%',
        height: 10
    }
});


export default ItemCart;