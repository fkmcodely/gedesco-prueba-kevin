import React from 'react';
import { useNavigate } from 'react-router';
import { Button, StyleSheet, View, Text } from "react-native";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <View style={styles.header}>
            <Text style={styles.logo} onPress={() => navigate('/')}>
                SHOP
            </Text>
            <View style={styles.actions}>
                <Button
                    title="Iniciar Sesión"
                    color="green"
                />
                <Button
                    title="Carrito"
                    color="blue"
                    onPress={() => navigate('/cart')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginTop: 60,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20
    },
    logo: {
        width: '45%'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        width: '65%'
    }
});

export default NavBar;