import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const getAllProducts = () => {
    return async(dispatch) => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/product/getAllProducts',
                headers: {
                'Content-Type': 'application/json',
                },
            })
            if(response.data.success) {
                dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: {
                        allProducts: response.data.message,
                    }
                })
            }
        } catch(error) {
            throw new Error(error.message)
        }
    }
}

export const addProduct = (productTitle, productPrice, quantity, adminEmail) => {
    return async(dispatch) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/product/addProduct',
                headers: {
                'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    productTitle,
                    productPrice,
                    quantity,
                    adminEmail,
                })
            });
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}