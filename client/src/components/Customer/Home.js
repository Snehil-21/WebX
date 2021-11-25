import React, { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
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
            addToast('Added To Cart', {appearance: 'success'})
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
                    <Link style={{textDecoration: 'none', color: '#000'}} to='/wishlist'><span>Cart</span></Link>
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
                            <StyledButton variant="contained" color="primary" onClick={(e) => addToWishlistHandler(e,product._id)}>Add to Cart</StyledButton>
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
        background-image: linear-gradient(to bottom right, #DA0028, #B40048, #72028E, #3401CB);
        margin: 0 8%;
        border-radius: 25px;
        display: flex;
        flex-basis: 33.33%;
        flex-wrap: wrap;
        padding-bottom: 16px;
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

const StyledButton = styled(Button)`
    &.css-sghohy-MuiButtonBase-root-MuiButton-root {
        margin-bottom: 2%;
        margin-top: 3%;
    }
`;

export default Home;