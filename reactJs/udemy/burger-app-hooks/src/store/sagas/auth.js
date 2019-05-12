import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/actionCreators/index';
import * as commonConstants from '../../common/CommonConstants';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], commonConstants.TOKEN);
    yield call([localStorage, 'removeItem'], commonConstants.USER_ID);
    yield call([localStorage, 'removeItem'], commonConstants.EXPIRATION_DATE);
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAumSfY33G8Q8a5ZYdHnOOia-WVE3t66sE';
    if(!action.isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAumSfY33G8Q8a5ZYdHnOOia-WVE3t66sE';
    }
    try {
        const response = yield axios.post(url, authData)

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem(commonConstants.TOKEN, response.data.idToken);
        yield localStorage.setItem(commonConstants.USER_ID, response.data.localId);
        yield localStorage.setItem(commonConstants.EXPIRATION_DATE, expirationDate);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
};

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem(commonConstants.TOKEN);
    if(!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem(commonConstants.EXPIRATION_DATE));
        if(expirationDate > new Date()) {
            const userId = yield localStorage.getItem(commonConstants.USER_ID);
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        } else {
            yield put(actions.logout());
        }
    }
};