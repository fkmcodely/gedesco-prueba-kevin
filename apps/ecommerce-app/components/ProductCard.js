import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { addProduct } from 'ecommerce-commons/redux/reducers/CartSlice';

const ProductCard = ({ item }) => {
    const dispatch = useDispatch();

    const addProductToCart = () => {
        dispatch(addProduct(item));
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${item.image}` }}
                style={{ width: '100%', height: 200 }} />
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
            <Button onPress={addProductToCart()} title="COMPRAR" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8E8E8',
        width: '100%',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        marginRight: 3
    },
});

export default ProductCard;