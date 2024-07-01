import React from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Footer} from "./layouts/Navbar and Footer/Footer";
import {Navbar} from "./layouts/Navbar and Footer/navbar";
import {SearchBooksPage} from "./layouts/SearchBooksPage/SearchBooksPage";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {BookCheckoutPage} from "./layouts/BookCheckoutPage/BookCheckoutPage";
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import {OktaConfig} from "./lib/OktaConfig";

const oktaAuth = new OktaAuth(OktaConfig);

export const App = () => {
    const customAuthHandler = () => {
        history.push('/login');
    }
    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    }

    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar/>
            <div className="flex-grow-1">
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/home'/>
                    </Route>
                    <Route path='/home'>
                        <HomePage/>
                    </Route>
                    <Route path='/search'>
                        <SearchBooksPage/>
                    </Route>
                    <Route path='/checkout/:bookId'>
                        <BookCheckoutPage/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}