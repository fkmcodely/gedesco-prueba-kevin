import React, { useEffect, useState } from 'react';
import { Text, Button, TextInput, Form, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginUser } from 'ecommerce-commons/services/users';
import { getAllUsers } from 'ecommerce-commons/services/users';
import { userRequest } from "ecommerce-commons/redux/reducers/UserSlice";
import { createUser } from 'ecommerce-commons/services/users';

const Session = () => {
    const { register, handleSubmit, reset } = useForm({});
    const session = useSelector(state => state.user.loggedUser);
    const dispatch = useDispatch();
    const [errorLog, setErrorLog] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [res, setRes] = useState();
    const loginUserCall = async () => {

        try {
            const isUser = await loginUser(username, password);
            const users = await getAllUsers(username);
            setRes(`${username} y ${password}`)
            if (isUser?.token) {
                const profile = users.find(item => item.username === userInfo.username);
                dispatch(userLoginRequest(profile))
                setRes(JSON.stringify(profile))
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
            <Text>{res}</Text>
            <TextInput style={styles.input} value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder='Usuario' />
            <TextInput type="password" style={styles.input} value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder='Contraseña' />
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