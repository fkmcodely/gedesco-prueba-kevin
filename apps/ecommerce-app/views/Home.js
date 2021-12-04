import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from 'react-native';
import { productRequest } from 'ecommerce-commons/redux/reducers/ProductsSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.products.list);

    useEffect(() => dispatch(productRequest()), []);

    return (
        <View style={styles.container}>
            <Text>Lista de productos</Text>
            <SafeAreaView style={styles.viewfix}>
                <ScrollView style={styles.productlist}>
                    {list.map((product) => <ProductCard item={product} />)}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#f1f2f3',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    products: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
        borderRadius: 8,
        backgroundColor: 'white'
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%'
    },
    viewfix: {
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

export default Home;