import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from 'react-redux';
import store from './store.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';

const appRouter = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      {
        path: '/',
        element: <HomeScreen />
      },
      {
        path: '/product/:id',
        element: <ProductScreen />
      },
      {
        path: '/cart',
        element: <CartScreen />
      },
      {
        path: '/login',
        element: <LoginScreen />
      },
      {
        path: '/register',
        element: <RegisterScreen />
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/shipping',
            element: <ShippingScreen />
          },
          {
            path: '/payment',
            element: <PaymentScreen />
          },
          {
            path: '/placeorder',
            element: <PlaceOrderScreen />
          },
          {
            path: '/order/:id',
            element: <OrderScreen />
          },
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={appRouter} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
