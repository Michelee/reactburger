import axios from 'axios';
import * as actionTypes from './actionTypes';




export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTIme) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTIme * 1000)
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        console.log(password)

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDrCjHmYjPJiLi1kIV_-WPVaOQrCjyvzoY';
 
        if(!isSignup){
             url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDrCjHmYjPJiLi1kIV_-WPVaOQrCjyvzoY';
        }

        axios.post(
            url,
            authData
        )
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error))
        })
    };
}


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
