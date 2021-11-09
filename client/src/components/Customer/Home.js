import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button } from '@mui/material';
import { Image } from 'cloudinary-react';

import * as productActions from '../../store/actions/Product';
import NavBar from '../NavBar';

const Home = () => {
    const dispatch = useDispatch();
    const allProd = useSelector(state => state.Product.productsList);

    useEffect(() => {
        async function getProducts() {
            await dispatch(productActions.getAllProducts())
        }
        getProducts();
    }, [dispatch])

    const addToCartHandler = () => {
        console.log('Added')
    }

    // console.log('Products', allProd)

    return (
        <>
            <NavBar />
            <StyledContainer>
                <ProductWrap>
                    {allProd.map(product => {
                        return (
                            <ProductCard key={product._id}>
                                    <Image style={{ height: '80%', borderRadius: '10px' }} cloudName = 'cloudSnehil' publicId = {`https://res.cloudinary.com/cloudsnehil/image/upload/v1635787798/${product.productPic}`} />
                                    <Info>
                                        <h4>Product Title: {product.productTitle}</h4>
                                        <h5>Price: {product.productPrice}</h5>
                                        <p>Added By: {product.addedBy.fullName}</p>
                                    </Info>
                                    <div 
                                        style={{
                                            display: 'flex',
                                            gap: '8px',
                                        }}>
                                        <Link style={{textDecoration: 'none'}} to={`/product/${product._id}`}><StyledButton variant="contained" color="primary">View More</StyledButton></Link>
                                        <Link style={{textDecoration: 'none'}} to=''><StyledButton variant="contained" color="primary" onClick={addToCartHandler}>Wishlist</StyledButton></Link>
                                    </div>
                            </ProductCard>
                        )
                    })}
                </ProductWrap>
                <p style={{position: 'relative'}}>Sample Text for now! Actual Data will be provided at the later stage here.</p>
            </StyledContainer>
        </>
    )
}

const StyledContainer = styled(Container)`
    &.MuiContainer-root {
        margin: 0;
        padding: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
    },
`;

const StyledButton = styled(Button)`
    &.css-sghohy-MuiButtonBase-root-MuiButton-root {
        margin-bottom: 2%;
        margin-top: 3%;
    }
`;

const ProductWrap = styled.div`
    width: 96%;
    height: 100%;
    margin: 1% auto;
    display: grid;
    grid-template-columns: 93%;
    position: relative;
    justify-content: center;
    align-items: center;
`;

const ProductCard = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    color: black;
    background: beige;
    text-transform: capitalize;
    justify-content: space-around;
    align-items: center;
    border: 2px solid black;
    border-radius: 12px;
    margin: 2% 0;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Home;