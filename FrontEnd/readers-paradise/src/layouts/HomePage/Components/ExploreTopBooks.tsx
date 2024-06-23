import {Link} from "react-router-dom";
import React from "react";

export const ExploreTopBooks = () => {
    return(
        <div className='p-5 mb-4 bg-dark header'>
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h1 className='display-5 fw-bold'>Find your next ADVENTURE!!!</h1>
                    <p className='col-md-8 fs-4'>Where do you want to go NEXT?</p>
                    <Link type='button' className='btn main-color btn-lg text-white' to="/search">
                        Explore Top Books
                    </Link>
                </div>
            </div>
        </div>
    );
}