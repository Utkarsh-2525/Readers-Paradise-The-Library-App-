import {useOktaAuth} from "@okta/okta-react";
import {useState} from "react";

export const postNewMessage = () => {

    const {authState} = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    return (
        <div className='card mt-3'>
            {
                displaySuccess &&
                <div className="alert alert-success" role='alert'>
                    Question added successfully! ;)
                </div>
            }
            <div className="card-header">
                Ask a question to M.Utkarsh (Admin of Reader's Paradise)
            </div>
            <div className="card-body">
                <form method="POST">
                    {
                        displayWarning &&
                        <div className="alert alert-danger"></div>
                    }
                </form>
            </div>
        </div>
    );
}