import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, StyleSheet, View, Text } from "react-native";

const NavBar = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.userInfo?.name.firstname)
    return (
        <View style={styles.header}>
            <Text style={styles.logo} onPress={() => navigate('/')}>
                SHOP
            </Text>
            <View style={styles.actions}>
                {
                    !user ? (
                        <Button
                            title="Iniciar Sesión"
                            color="green"
                            onPress={() => navigate('/login')}
                        />
                    ) : (
                        <Text style={styles.welcomeText}>Bienvenido!</Text>
                    )
                }

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
        paddingBottom: 20,
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',

        width: '45%'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        marginRight: 5
    }
});

export default NavBar;