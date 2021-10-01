import axios from 'axios';

export const ADD_PRODUCT = 'ADD_PRODUCT';

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