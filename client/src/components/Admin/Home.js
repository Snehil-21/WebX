import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {Container, TextField , Button} from '@mui/material';
import { useToasts } from 'react-toast-notifications';

import NavBar from '../NavBar';
import * as productActions from '../../store/actions/Product';

export default function Home () {
    const [productTitle, setProductTitle] = useState('')
    const [quantity, setQuantity] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productPic, setProductPic] = useState('')
    const fileRef = useRef(null);

    const [deleteProductTitle, setDeleteProductTitle] = useState('')

    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const adminEmail = useSelector(state => state.Auth.email)

    const addProductHandler = async (e) => {
        e.preventDefault()
        try {
            if(productTitle && productPrice && quantity && description && productPic && adminEmail) {
                await dispatch(productActions.addProduct(
                    productTitle,
                    productPrice,
                    quantity,
                    description,
                    productPic,
                    adminEmail,
                ))
                setProductTitle('')
                setProductPrice('')
                setQuantity('')
                setDescription('')
            }
        } catch (error) {
            addToast(error.message, {appearance: 'error'});
        }
    }

    const handleChange = (e) => {
        setProductPic(e.target.files[0])
    }

    // console.log(productPic);
    return (
        <>
        <input
            style={{display: 'none'}}
            type="file"
            ref={fileRef}
            onChange={handleChange}
        />
        <NavBar />
        <div>
            <Wrapper>
                <AddForm>
                    <h2 style={{color: 'turquoise'}}>Add a new Product into the Shop!</h2>
                    
                    <StyledTextField id="outlined-basic" placeholder="Product Title" variant="outlined" value={productTitle} onChange={(event) => setProductTitle(event.target.value)} />
                    
                    <StyledTextField id="outlined-basic" placeholder="Quantity" variant="outlined" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                    
                    <StyledTextField id="outlined-basic" placeholder="Price" variant="outlined" value={productPrice} onChange={(event) => setProductPrice(event.target.value)} />

                    <StyledTextField id="outlined-basic" placeholder="Description" variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} />

                    <StyledButton type="button" onClick= { () => fileRef.current.click() } >Add Picture</StyledButton>
                    {productPic && <h5 style={{color: 'gray'}}>Picture Uploaded. Edit above or Save!</h5>}
                    
                    <StyledButton variant="contained" color="primary" onClick={addProductHandler}>Add Product</StyledButton>
                </AddForm>
                <AddForm>
                    <h2 style={{color: 'turquoise'}}>Remove an existing Product from the Shop!</h2>
                    
                    <StyledTextField id="outlined-basic" placeholder="Product Title" variant="outlined" value={deleteProductTitle} onChange={(event) => setDeleteProductTitle(event.target.value)} />
    
                    <StyledButton variant="contained" color="primary" onClick={addProductHandler}>Remove Product</StyledButton>
                </AddForm>
            </Wrapper>
        </div>
        </>
    )
}

const Wrapper = styled(Container)`
    background: beige;
    &.css-1oqqzyl-MuiContainer-root {
        margin: 0;
        max-width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const StyledTextField = styled(TextField)`
    &.css-1u3bzj6-MuiFormControl-root-MuiTextField-root {   
        margin: 1% 0;
        display: block;
        border-radius: 12px;
        background: white;
        border: none;
        outline: none;
        color: black;
    } 
`;

const AddForm = styled(Container)`
    &.css-1oqqzyl-MuiContainer-root {
        position: relative;
        background: #000;
        margin: 0 0 2% 0;
        max-width: 80%;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        margin-top: 2px;
    }
`;

const StyledButton = styled(Button)`
    &.css-sghohy-MuiButtonBase-root-MuiButton-root {
        margin-bottom: 2%;
        margin-top: 3%;
    }
`;