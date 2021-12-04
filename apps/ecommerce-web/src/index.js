import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "ecommerce-commons/redux/store";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ProductList from "./routes/ProductList";
import NavigationBar from './components/NavigationBar';
import Session from './routes/Session';
import Product from './routes/Product';
import Cart from "./routes/Cart";
import Orders from "./routes/Orders";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/session" element={<Session />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
