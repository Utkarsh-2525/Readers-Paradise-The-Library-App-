import {useOktaAuth} from "@okta/okta-react";
import {SpinnerLoading} from "../layouts/utils/SpinnerLoading";
import {Redirect} from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";

const LoginWidget = ({config}) => {
    const {oktaAuth, authState} = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    }
    const onFailure = (error) => {
        console.log('Sign in Error!', error);
    }

    if (!authState) {
        return (
            <SpinnerLoading/>
        )
    }
    return authState.isAuthenticated ?
        <Redirect to={{pathname: '/'}}/>
        :
        <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onFailure}/>
}
export default LoginWidget;