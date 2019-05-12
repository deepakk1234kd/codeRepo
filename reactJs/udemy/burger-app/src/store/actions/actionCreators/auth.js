import * as actionTypes from '../actionTypes';
import axios from 'axios';
import * as commonConstants from '../../../common/CommonConstants';

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
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem(commonConstants.TOKEN);
    localStorage.removeItem(commonConstants.USER_ID );
    localStorage.removeItem(commonConstants.EXPIRATION_DATE);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    //console.log('isSignUp: ', isSignUp);
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAumSfY33G8Q8a5ZYdHnOOia-WVE3t66sE';
        if(!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAumSfY33G8Q8a5ZYdHnOOia-WVE3t66sE';
        }
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                localStorage.setItem(commonConstants.TOKEN, response.data.idToken);
                localStorage.setItem(commonConstants.USER_ID, response.data.localId);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem(commonConstants.EXPIRATION_DATE, expirationDate);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem(commonConstants.TOKEN);
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem(commonConstants.EXPIRATION_DATE));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem(commonConstants.USER_ID);
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            } else {
                dispatch(logout());
            }
        }
    };
};