import React from "react";
import styled from 'styled-components';
import {Container, TextField , Button} from '@mui/material';

import NavBar from '../NavBar';

export default function Home () {
    const [prodTitle, setProdTitle] = ('')
    const [quantity, setQuantity] = ('')
    const [price, setPrice] = ('')

    const addProductHandler = (e) => {
        e.preventDefault()
        console.log('Added!')
    }

    return (
        <>
        <NavBar />
        <div>
            <Wrapper>
                <AddForm>
                    <h2 style={{color: 'white'}}>Add a new Product into the Shop!</h2>
                    <StyledTextField id="outlined-basic" label="Product Title" variant="outlined" value={prodTitle} onChange={(event) => setProdTitle(event.target.value)} />
                    <StyledTextField id="outlined-basic" label="Quantity" variant="outlined" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                    <StyledTextField id="outlined-basic" label="Price" variant="outlined" value={price} onChange={(event) => setPrice(event.target.value)} />
                    <StyledButton variant="contained" color="primary" onClick={addProductHandler}>Add Product</StyledButton>
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
    }
`;

const AddForm = styled(Container)`
    &.css-1oqqzyl-MuiContainer-root {
        background: #000;
        margin: 0 0 2% 0;
        max-width: 80%;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const StyledButton = styled(Button)`
    &.css-sghohy-MuiButtonBase-root-MuiButton-root {
        margin-bottom: 2%;
        margin-top: 3%;
    }
`;