import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";


const stripePromise = loadStripe('pk_test_51OyFlTSAA24A6bgLv9mM6vXO2SeuDqifHvQEdx32rYxuwMU0KtNtkCwF5C7fb9G7uIU6YadFTkFlb4pGQ3gLnjVC00SqT5wC6u');
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Elements stripe={stripePromise}>
            <App/>
        </Elements>
    </BrowserRouter>
);

