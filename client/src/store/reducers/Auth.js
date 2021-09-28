import { LOGIN_USER, LOGIN_ADMIN } from '../actions/Auth';

const initialState = {
    isAuthCustomer: false,
    isAuthAdmin: false,
    fullName: '',
    email: '',
    username: '',
}

export default function AuthReducer (state= initialState, action) {
    switch(action.type) {
        case LOGIN_USER: {
            return{
                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                username: action.payload.username,
                isAuthCustomer: true,
            }
        }
        case LOGIN_ADMIN: {
            return{
                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                username: action.payload.username,
                isAuthAdmin: true,
            }
        }
        default: {
            return state;
        }
    }
}