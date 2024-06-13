import {useEffect, useState} from "react";
import BookModel from "../../Models/BookModel";
import {SpinnerLoading} from "../utils/SpinnerLoading";
import {SearchBook} from "./components/SearchBook";
import {Pagination} from "../utils/Pagination";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const[currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const[totalAmountOfBooks,setTotalAmountOfBooks] =useState<number>(0);
    const[totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseURL: string = "http://localhost:8080/api/books";
            const url: string = `${baseURL}?page=${currentPage-1}&size=${booksPerPage}`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error('Something went wrong!');
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];
            for (const key in responseData)
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                })
            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0,0);
    }, [currentPage]);

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

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    let lastItem=booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate=(pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search" className="form-control" placeholder='Search' aria-labelledby='Search'/>
                                <button className="btn btn-ouline-success">Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type='button' id='dropdownMenuButton1' data-bs-toggle='toggle' aria-expanded='false'>
                                    Category
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li>
                                        <a className='dropdown-item' href="#">All</a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href="#">Front End</a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href="#">Back End</a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href="#">Data End</a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href="#">DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results:({totalAmountOfBooks})</h5>
                    </div>
                    <p>{indexOfFirstBook+1} to {lastItem} of {totalAmountOfBooks} items:</p>
                    {books.map(book => (<SearchBook book = {book} key={book.id} />))}
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}