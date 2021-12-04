import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { store } from "ecommerce-commons/redux/store";
import { NativeRouter, Route, Routes, Link } from "react-router-native";
import Home from './views/Home';
import Cart from './views/Cart';
import Session from './views/Session';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NativeRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/login" element={<Session />} />
          </Routes>
        </NativeRouter>
      </Provider>
    </>
  );
}
