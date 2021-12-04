import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const NavigationBar = props => {
    const user = useSelector(state => state.user.userInfo.name?.firstname);
    const isLogged = useSelector(state => state.user.loggedUser);
    const navigate = useNavigate();

    return (
        <header className="flex justify-between px-10 py-10 bg-yellow-100">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
                LOGO
            </div>
            <div className="flex">
                {isLogged ? <p className=" pd-2 rounded-md bg-green-400">Bienvenido de nuevo {user && (user)}</p>
                    : <button className="bg-blue-200 mr-10 rounded-md p-2" onClick={() => navigate('/session')}>Iniciar Sesión</button>}
                {isLogged && (
                    <button
                        onClick={() => navigate('/orders')}
                        className="ml-5 bg-blue-200 mr-10 p-2 rounded-md">
                        Ver pedidos
                    </button>)}
                <img
                    onClick={() => navigate('/cart')}
                    className="w-10 cursor-pointer"
                    src="/shopping-cart.png"
                    alt='shopping-cart'
                />
            </div>
        </header>
    );
};

NavigationBar.propTypes = {

};

export default NavigationBar;