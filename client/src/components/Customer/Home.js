import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Container } from '@mui/material';

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

    console.log('Products', allProd)

    return (
        <>
            <NavBar />
            <StyledContainer>
                <ProductWrap>
                    {allProd.map(product => {
                        return (
                            <>
                                <ProductCard>
                                    <h4>{product.productTitle}</h4>
                                    <h5>Price: {product.productPrice}</h5>
                                </ProductCard>
                            </>
                        )
                    })}
                </ProductWrap>
                <p style={{position: 'relative'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab modi, eveniet quasi debitis placeat accusamus accusantium praesentium molestiae dolore, quis doloribus velit facere ipsa quibusdam ratione inventore obcaecati. Similique, aliquam.</p>
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

const ProductWrap = styled.div`
    width: 96%;
    height: 100%;
    margin: 2% auto;
    display: grid;
    grid-column-gap: 3%;
    grid-template-columns: 31% 31% 31%;
    position: relative;
    justify-content: center;
    align-items: center;
`;

const ProductCard = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    color: gray;
    background: beige;
    text-transform: capitalize;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    border-radius: 25px;
    margin: 2% 0;
`;

export default Home;