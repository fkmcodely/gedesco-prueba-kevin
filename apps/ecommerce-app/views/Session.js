import React, { useEffect, useState } from 'react';
import { Text, Button, TextInput, Form, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginUser } from 'ecommerce-commons/services/users';
import { getAllUsers } from 'ecommerce-commons/services/users';
import { userLoginRequest } from "ecommerce-commons/redux/reducers/UserSlice"

const Session = () => {
    const { register, handleSubmit, reset } = useForm({});
    const session = useSelector(state => state.user.loggedUser);
    const dispatch = useDispatch();
    const [errorLog, setErrorLog] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();

    const [load, setLoad] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [res, setRes] = useState();
    const loginUserCall = async () => {
        try {
            const isUser = await loginUser(username, password);
            const users = await getAllUsers(username);
            setLoad(username + password)
            if (isUser?.token) {
                const profile = users.find(item => item.username === username);
                dispatch(userLoginRequest(profile))
                navigate('/')
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                    reset();
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    }, [session]);

    return (
        <View style={styles.containerLogin}>
            <Text>Iniciar Sesión</Text>
            <Text>{'kevin 2'}</Text>
            <Text>{load}</Text>
            <Text>{res}</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                onChangeText={text => setUsername(text)}
                defaultValue={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Contrasela"
                onChangeText={text => setPassword(text)}
                defaultValue={password}
            />
            {error && (<Text>Usuario o Contraseña incorrectos.</Text>)}
            <Button title='Aceptar' type="submit" onPress={() => loginUserCall()} />
        </View>
    );
};


const styles = StyleSheet.create({
    containerLogin: {
        padding: 20
    },
    input: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10
    }
});

export default Session;