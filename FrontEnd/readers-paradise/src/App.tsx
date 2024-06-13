import React from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Footer} from "./layouts/Navbar and Footer/Footer";
import {Navbar} from "./layouts/Navbar and Footer/navbar";
import {SearchBooksPage} from "./layouts/SearchBooksPage/SearchBooksPage";

export const App = () => {
    return (
        <div>
            <Navbar/>
            {/*<HomePage/>*/}
            <SearchBooksPage/>
            <Footer/>
        </div>
    );
}