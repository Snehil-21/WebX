import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../NavBar';
import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => ({
    parent: {
        '&. css-1oqqzyl-MuiContainer-root' : {
            margin: '0',
            padding: '0',
            maxWidth: '100%',
            display: 'flex',
        },  
    },
    productsBox: {
        width: '70%',
        backgroundColor: 'skyblue',
    },
    cart: {
        width: '30%',
        backgroundColor: 'beige',
        position: 'sticky',
        top: '0',
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <>
            <NavBar />
            <div>
                <Container className={classes.parent}>
                    <div className={classes.productsBox}>
                        
                    </div>
                    <div className={classes.cart}>Cart</div>
                </Container>
            </div>
        </>
    )
}

export default Home;