import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion"

import Social from '../assets/main-logo.svg';
import { TextField } from '@material-ui/core';

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
    height: '75%',
    width: '40%',
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

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Meet.Ly
          </Typography>
          <div className={classes.rightContainer}>
            <Button variant="contained" color="primary" className={classes.button}>Login</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
          <div className={classes.inDiv}>
              <Typography style={{color: '#000D4B', fontWeight: 'bold', fontSize: '2rem'}}>Sign Up <span style={{color: '#CCCFDB'}}>Meet.Ly</span></Typography>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Full Name"     variant="outlined" className={classes.textfield} />
                <TextField id="outlined-basic" label="Email"     variant="outlined" className={classes.textfield} />
                <TextField id="outlined-basic" label="Username"     variant="outlined" className={classes.textfield} />
                <TextField id="outlined-basic" label="Password"     variant="outlined" className={classes.textfield} />
                <TextField id="outlined-basic" label="Confirm Password"     variant="outlined" className={classes.textfield} />
                <Button variant="contained" color="primary" className={classes.button}>Sign-Up</Button>
              </form>
            </div>
          <motion.img 
            transition={{ ease: "easeOut", duration: 2 }}
            src={Social} 
            alt="Social Media" 
            className={classes.social} 
        />
      </div>
    </div>
  );
}