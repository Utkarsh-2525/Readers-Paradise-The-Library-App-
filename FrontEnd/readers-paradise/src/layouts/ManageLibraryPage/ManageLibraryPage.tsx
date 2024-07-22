import {useOktaAuth} from "@okta/okta-react";
import {useState} from "react";
import {Redirect} from "react-router-dom";
import {AdminMessages} from "./components/AdminMessages";

export const ManageLibraryPage = () => {

    const {authState} = useOktaAuth();
    const [changeQuantityOfBooksCLick, setChangeQuantityOfBooksCLick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addBookClickFunction(){
        setChangeQuantityOfBooksCLick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfBooksCLickFunction(){
        setChangeQuantityOfBooksCLick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction(){
        setChangeQuantityOfBooksCLick(false);
        setMessagesClick(true);
    }

    if (authState?.accessToken?.claims.userType === undefined || authState?.accessToken?.claims.userType === '')
        return <Redirect to='/login'/>

    return(
        <div className="container">
            <div className="mt-5">
                <h3>Library Services</h3>
                <nav>
                    <div className="nav nav-tabs" id='nav-tab' role='tablist'>
                        <button onClick={addBookClickFunction} className="nav-link active" id='nav-add-book-tab' data-bs-toggle='tab' data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book' aria-selected='false'>
                            Add New Book
                        </button>
                        <button onClick={changeQuantityOfBooksCLickFunction} className="nav-link" id='nav-quantity-tab' data-bs-toggle='tab' data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' aria-selected='true'>
                            Change Quantity
                        </button>
                        <button onClick={messagesClickFunction} className="nav-link" id='nav-messages-tab' data-bs-toggle='tab' data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages' aria-selected='true'>
                            Messages
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id='nav-tabContent'>
                    <div className="tab-pane fade show active" id='nav-add-book' role='tabpanel' aria-labelledby='nav-add-book-tab'>
                        Add New Book
                    </div>
                    <div className="tab-pane fade" id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                        {changeQuantityOfBooksCLick ? <>Change Quantity</> : <></>}
                    </div>
                    <div className="tab-pane fade" id='nav-messages' role='tabpanel' aria-labelledby='nav-messages-tab'>
                        {messagesClick ? <AdminMessages/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}