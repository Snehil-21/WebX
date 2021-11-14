import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import * as productActions from '../../src/store/actions/Product';

export default function Wishlist() {
    const customerEmail = useSelector(state => state.Auth.email)
    const dispatch = useDispatch();
    const WishlistItems = useSelector(state => state.Product.wishlistProductsList);
   
    useEffect(() => {
        async function getProducts() {
            await dispatch(productActions.getWishlistProducts(customerEmail))
        }
        getProducts();
    }, [dispatch, customerEmail])
    // console.log(WishlistItems[0].wishlist)
    return (
        <>
            <Wrapper>
                <h2 style={{textDecoration: 'underline'}} >Wishlist</h2>
                {WishlistItems[0].wishlist.map(item => {
                    return (
                        <h5 key={item._id}>{item.productTitle}</h5>
                    )
                })}
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`

`;