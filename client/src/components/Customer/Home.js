import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../NavBar';
import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => ({
    parent: {
        '&.MuiContainer-root' : {
            margin: '0',
            padding: '0',
            maxWidth: '100%',
            display: 'flex',
        },  
    },
    productsBox: {
        width: '100%',
        backgroundColor: 'skyblue',
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
                        Product
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Home;