import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShopLogo from '../../assets/shop-logo.jpg';
import { TextField } from '@material-ui/core';
import { motion } from "framer-motion"
import { useToasts } from 'react-toast-notifications';

import * as authActions from '../../store/actions/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'space-evenly',
    backgroundColor: '#ffffff',
  },
  title: {
    flexGrow: 1,
    color: '#000D4B',
    fontWeight: 'bold',
    fontSize: '2rem',
  },
  button: {
    position: 'relative',
    borderRadius: '12px',
  },
  rightContainer: {
    position: 'relative',
    flexGrow: 1,
  },
  body: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '2em 0',
    height: '80vh',
    width: '100vw',
  },
  social: {
    height: '100%',
    width: '50%',
  },
  inDiv: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
  textfield: {
      margin: '4% 0',
      display: 'block',
      borderRadius: '12px',
  }
}));

export default function Login() {
  const { addToast } = useToasts();
  const dispatch = useDispatch(); 
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
    
  const history = useHistory();

  const loginHandler = async () => {
      try {
        await dispatch(authActions.logInUser(userName, password));
        history.replace('/home')
      } catch (error) {
        addToast(error.message, {appearance: 'error'});
    }
  }

  return (
    <div className={classes.body}>
        <div className={classes.inDiv}>
            <Typography style={{color: '#000D4B', fontWeight: 'bold', fontSize: '2rem'}}>Log In <span style={{color: '#CCCFDB'}}>Shop.Ly</span></Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Username"     variant="outlined" className={classes.textfield} value={userName} onChange={(event) => setUserName(event.target.value)} />
                <TextField id="outlined-basic" label="Password"     variant="outlined" type="password" className={classes.textfield} value={password} onChange={(event) => setPassword(event.target.value)} />
                <Button variant="contained" color="primary" className={classes.button} onClick={loginHandler}>Log-In</Button>
            </form>
        </div>
        <motion.img 
            transition={{ ease: "easeOut", duration: 2 }}
            src={ShopLogo} 
            alt="Social Media" 
            className={classes.social} 
        />
    </div>
  );
}