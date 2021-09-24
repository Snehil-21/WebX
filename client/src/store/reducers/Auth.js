import { LOGIN_USER } from '../actions/Auth';

const initialState = {
    isAuth: false,
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
                isAuth: true,
            }
        }
        default: {
            return state;
        }
    }
}