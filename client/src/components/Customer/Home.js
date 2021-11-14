import React, { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button } from '@mui/material';
import { Image } from 'cloudinary-react';

import * as authActions from '../../store/actions/Auth';
import * as productActions from '../../store/actions/Product';
import NavBar from '../NavBar';
import { useToasts } from 'react-toast-notifications';

const Home = () => {
    const history = useHistory();
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const allProd = useSelector(state => state.Product.productsList);
    const customerEmail = useSelector(state => state.Auth.email)

    useEffect(() => {
        async function getProducts() {
            await dispatch(productActions.getAllProducts())
        }
        getProducts();
    }, [dispatch])

    const addToWishlistHandler = async (e,prodId) => {
        e.preventDefault()
        try {
            await dispatch(productActions.addToWishlist(prodId, customerEmail))
            addToast('Added To Wishlist', {appearance: 'success'})
        } catch(error) {
            addToast(error.message, {appearance: 'error'})
        }
    }

    const handleLogout = async () => {
        try {
            await dispatch(authActions.logout())
            history.replace('/login')
        } catch (error) {
            addToast('Something went wrong!', {appearance: 'error'});
        }
    }

    // console.log('Products', allProd)

    return (
        <Wrapper>
            <Header>
                <h4>WebX</h4>
                <div>
                    <Link style={{marginRight: '16px', textDecoration: 'none', color: '#000'}} to='/home'><span>Home</span></Link>
                    <Link style={{textDecoration: 'none', color: '#000'}} to='/wishlist'><span>Wishlist</span></Link>
                </div>
                <div>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </Header>
            <Main>
                <div>
                    {allProd.map(product => {
                    return (
                        <ProductCard>
                            <Image style={{ minHeight: '70%', width: '75%',borderRadius: '25px' }} cloudName = 'cloudSnehil' publicId = {`https://res.cloudinary.com/cloudsnehil/image/upload/v1635787798/${product.productPic}`} />
                            <h4>{product.productTitle}</h4>
                            <h4>{product.productPrice}</h4>
                            <StyledButton variant="contained" color="primary" onClick={(e) => addToWishlistHandler(e,product._id)}>Wishlist</StyledButton>
                        </ProductCard>
                        )
                    })}
                </div>
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    background: #FFEBC2;
    overflow-x: hidden;
`;

const Header = styled.div`
    margin: 1% 4%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #000;
    z-index: 2;
    position: sticky;
    top: 0;

    >h4 {
        font-size: 26px;
        font-weight: bold;
        letter-spacing: 1px;
    }

    >div {
        font-weight: 600;
    }

    >div>button {
        color: brown;
    }
`;

const Main = styled.div`
    height: 100vh;
    overflow-y: hidden;
    padding-bottom: 6%;
    >div {
        // background: #FEC625;
        margin: 0 8%;
        border-radius: 25px;
        max-height: 300px;
        display: flex;
        flex-basis: 33.33%;
        flex-wrap: wrap;
    }
`;

const ProductCard = styled.div`
    display: flex;
    // position: relative;
    flex-direction: column;
    color: #514486;
    background: beige;
    text-transform: capitalize;
    align-items: center;
    border: 2px solid black;
    border-radius: 12px;
    margin: 2% 1%;
    width: 31%;
    height: 320px;
    padding-top: 8px; 

    >h4 {
        margin: 4px;
    }
    >h6 {
        margin: 0;
    }
`;

// const StyledContainer = styled(Container)`
//     &.MuiContainer-root {
//         margin: 0;
//         padding: 0;
//         max-width: 100%;
//         display: flex;
//         flex-direction: column;
//     },
// `;

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

// const ProductCard = styled.div`
//     display: flex;
//     position: relative;
//     flex-direction: row;
//     color: black;
//     background: beige;
//     text-transform: capitalize;
//     justify-content: space-around;
//     align-items: center;
//     border: 2px solid black;
//     border-radius: 12px;
//     margin: 2% 0;
// `;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Home;

{/* <NavBar />
    <StyledContainer>
        <ProductWrap>
            {allProd.map(product => {
                return (
                    <ProductCard key={product._id}>
                            <Image style={{ height: '80%', borderRadius: '10px', maxHeight: '280px' }} cloudName = 'cloudSnehil' publicId = {`https://res.cloudinary.com/cloudsnehil/image/upload/v1635787798/${product.productPic}`} />
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
                                <Link style={{textDecoration: 'none'}} to=''><StyledButton variant="contained" color="primary" onClick={(e) => addToWishlistHandler(e,product._id)}>Wishlist</StyledButton></Link>
                            </div>
                    </ProductCard>
                )
            })}
        </ProductWrap>
        <p style={{position: 'relative'}}>Sample Text for now! Actual Data will be provided at the later stage here.</p>
    </StyledContainer> */}