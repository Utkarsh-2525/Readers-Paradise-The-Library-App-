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
import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import {ReviewListPage} from "./layouts/BookCheckoutPage/ReviewListPage/ReviewListPage";
import {ShelfPage} from "./layouts/ShelfPage/ShelfPage";

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
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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
                        <Route path='/reviewlist/:bookId'>
                            <ReviewListPage/>
                        </Route>
                        <Route path='/checkout/:bookId'>
                            <BookCheckoutPage/>
                        </Route>
                        <Route path='/login' render={() =>
                            <LoginWidget config={OktaConfig}/>}
                        />
                        <Route path='/login/callback' component={LoginCallback}/>
                        <SecureRoute path='/shelf'><ShelfPage/></SecureRoute>
                    </Switch>
                </div>
                <Footer/>
            </Security>
        </div>
    );
}