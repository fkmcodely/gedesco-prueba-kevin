import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Session = () => {
    const session = useSelector(state => state.user.loggedUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    }, [session])

    return (
        <section className="flex px-10 pt-10 pb-4 bg-blue-300 min-h-screen">
            <div className="w-6/12 p-4">
                <h2 className="mb-4">Registro de usuario:</h2>
                <RegisterForm />
            </div>
            <div className="w-6/12 p-4">
                <h2 className="mb-4">Iniciar Sesión</h2>
                <LoginForm />
            </div>
        </section>
    );
};

export default Session;