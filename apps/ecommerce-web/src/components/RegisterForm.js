import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { userRequest } from "ecommerce-commons/redux/reducers/UserSlice";
import { createUser } from 'ecommerce-commons/services/users';

const RegisterForm = () => {
    const { register, handleSubmit, reset } = useForm({});
    const dispatch = useDispatch();
    const [errorLog, setErrorLog] = useState(false);

    const registerUserCall = async (userInfo) => {
        dispatch(userRequest(userInfo))
        try {
            navigator.geolocation.getCurrentPosition(async (success, err) => {
                const response = await createUser({
                    ...userInfo,
                    address: {
                        ...userInfo.address,
                        geolocation: {
                            lat: success ? String(success.coords.latitude) : '',
                            long: success ? String(success.coords.longitude) : '',
                        }
                    }
                });
                if (response.status === "Error") {
                    setErrorLog(true);
                    setTimeout(() => {
                        setErrorLog(false);
                        reset();
                    }, 3000);
                } else {
                    dispatch(userRequest(response));
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="pt-7 bg-blue-600 h-62 p-5" >
            <form className="flex flex-col" onSubmit={handleSubmit(registerUserCall)}>
                Datos personales:
                <div className="flex justify-between pb-3">
                    <input className="w-2/5" type="text" placeholder="Nombre" {...register('name.firstname')} />
                    <input className="w-2/5" type="text" placeholder="Apellido" {...register('name.lastname')} />
                </div>
                <label className="pb-5">
                    <input {...register('email')} className="border-blue-100 w-full" placeholder="Email" type="email" required />
                </label>
                <label className="pb-5">
                    <input {...register('username')} className="border-blue-100 w-full" placeholder="Nombre de usuario" type="text" required />
                </label>
                <label className="pb-5">
                    <input {...register('phone')} className="border-blue-100 w-full" placeholder="Telefono" type="phone" />
                </label>
                <label className="pb-5">
                    <input {...register('password')} className="border-blue-100 w-full" placeholder="Contraseña" type="password" required />
                </label>
                Direccion:
                <label className="mb-5">
                    <input {...register('address.city')} className="border-blue-100 pb-4 w-full" placeholder="Contraseña" type="Ciudad" />
                </label>
                <label className="mb-5">
                    <input {...register('address.street')} className="border-blue-100 mb- w-full" placeholder="Calle" type="text" />
                </label>
                <label className="mb-5">
                    <input {...register('address.number')} className="border-blue-100 mb-2 w-full" placeholder="Numero" type="text" />
                </label>
                <label className="mb-5">
                    <input {...register('address.zipcode')} className="border-blue-100 mb-2 w-full" placeholder="Codigo Postal" type="text" />
                </label>
                <button type="submit" className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Aceptar</button>
            </form>
        </div>
    );
};

export default RegisterForm;