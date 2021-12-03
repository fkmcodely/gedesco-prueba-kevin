import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { userLoginRequest } from 'ecommerce-commons/redux/reducers/UserSlice';
import { loginUser } from 'ecommerce-commons/services/users';
import { getAllUsers } from 'ecommerce-commons/services/users';

const LoginForm = () => {
    const { register, handleSubmit, reset } = useForm({});
    const dispatch = useDispatch();
    const [error, setError] = useState();

    const loginUserCall = async (userInfo) => {
        try {
            const isUser = await loginUser(userInfo.username, userInfo.password);
            const users = await getAllUsers(userInfo.username);

            if (isUser.token) {
                const profile = users.find(item => item.username === userInfo.username);
                dispatch(userLoginRequest(profile))
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

    return (
        <div className="pt-7 bg-blue-600 h-62 p-5" >
            <form className="flex flex-col" onSubmit={handleSubmit(loginUserCall)}>
                Datos personales:
                <label className="pb-5">
                    <input {...register('username')} className="border-blue-100 w-full" placeholder="Nombre de usuario" type="text" required />
                </label>
                <label className="pb-5">
                    <input {...register('password')} className="border-blue-100 w-full" placeholder="Contraseña" type="password" required />
                </label>
                {error && (<p className="bg-red-400 p-3">Usuario o Contraseña incorrectos</p>)}
                <button type="submit" className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Aceptar</button>
            </form>
        </div>
    );
};

export default LoginForm;