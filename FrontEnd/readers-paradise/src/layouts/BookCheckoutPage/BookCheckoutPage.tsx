import {useEffect, useState} from "react";
import BookModel from "../../Models/BookModel";
import {SpinnerLoading} from "../utils/SpinnerLoading";
import {StarsReview} from "../utils/StarsReview";
import {CheckoutAndReviewBox} from "./CheckoutAndReviewBox";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseURL: string = `http://localhost:8080/api/books/${bookId}`;
            // const url: string = `${baseURL}?page=0&size=9`;
            const response = await fetch(baseURL);
            if (!response.ok)
                throw new Error('Something went wrong!');

            const responseJson = await response.json();

            const loadedBooks: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };
            setBook(loadedBooks);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {
                            book?.img ?
                                <img src={book?.img} width='226' height='349' alt="Book"/>
                                :
                                <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='349'
                                     alt="Book"/>
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview Rating={4.5} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false}/>
                </div>
                <hr/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {
                        book?.img ?
                            <img src={book?.img} width='226' height='349' alt="Book"/>
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='349'
                                 alt="Book"/>
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview Rating={4.5} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true}/>
                <hr/>
            </div>
        </div>
    );
}