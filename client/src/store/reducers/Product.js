import { GET_ALL_PRODUCTS } from '../actions/Product';

const initialState = {
    productsList: [],
}

export default function ProductReducer (state= initialState, action) {
    switch(action.type) {
        case GET_ALL_PRODUCTS : {
            return {
                ...state,
                productsList: action.payload.allProducts,
            }
        }
        default: {
            return state;
        }
    }
}