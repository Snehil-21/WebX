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

export const addProduct = (productTitle, productPrice, quantity, description, productPic, adminEmail) => {
    return async(dispatch) => {
        try {
            const formData = new FormData();
            formData.append('file', productPic)
            formData.append('upload_preset', 'customPreset')
            
            const cloudinaryRes = await axios({
                method: 'POST',
                url: 'https://api.cloudinary.com/v1_1/cloudsnehil/image/upload',
                data: formData
            })
            // console.log(cloudinaryRes);
            const picUrl = cloudinaryRes.data.public_id
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
                    description,
                    picUrl,
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