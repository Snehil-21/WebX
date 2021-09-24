import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const signupUser = (fullName, email, username, password) => {
    return async(dispatch) => {
        try {
            await axios({
                method: 'POST',
                url: '/auth/signup',
                headers: {
                'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    fullName,
                    email,
                    username,
                    password,
                })
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const logInUser = (username, password) => {
    return async(dispatch) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/auth/login',
                headers: {
                'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    username,
                    password,
                })
            });
            if(response.status === 200 && response.data.success) {
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        fullName: response.data.message.fullName,
                        email: response.data.message.email,
                        username: response.data.message.username,
                        isAuth: true
                    }
                })
            }
            else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}