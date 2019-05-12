import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state for a invalid action type and undefined', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should return the initial state for a invalid action type and valid state object', () => {
        expect(reducer({someProperty: 'value'}, {})).toEqual({
            someProperty: 'value'
        });
    });

    it('should return null for a invalid action type and null state', () => {
        expect(reducer(null, {})).toEqual(null);
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {type: actionTypes.AUTH_SUCCESS,
            idToken: 'test-token', 
            userId: 'test-userId'
        })).toEqual({
            token: 'test-token',
            userId: 'test-userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});