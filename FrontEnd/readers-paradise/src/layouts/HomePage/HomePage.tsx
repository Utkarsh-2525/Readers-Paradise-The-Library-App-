import {Navbar} from "../Navbar and Footer/navbar";
import {ExploreTopBooks} from "./Components/ExploreTopBooks";
import {Carousel} from "./Components/Carousel";
import {Heros} from "./Components/Heros";
import {LibraryServices} from "./Components/LibraryServices";
import {Footer} from "../Navbar and Footer/Footer";
import React from "react";

export const HomePage = () => {
    return (
        <>
            <ExploreTopBooks/>
            <Carousel/>
            <Heros/>
            <LibraryServices/>
        </>
    )
}