import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import * as authActions from '../store/actions/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    zIndex: 10,
    padding: '0 12%',
  },
  title: {
    flexGrow: 1,
    color: '#000D4B',
    fontWeight: 'bold',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    position: 'relative',
    borderRadius: '12px',
  },
  rightContainer: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
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
  },
  link: {
    textDecoration: 'none',
  }
}));

export default function ButtonAppBar({ admin }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();
  const auth = useSelector(state => state.Auth);
  
  const handleLogout = async () => {
    try {
      await dispatch(authActions.logout())
      history.replace('/login')
    } catch (error) {
      addToast('Something went wrong!', {appearance: 'error'});
    }
  }
  
  return (
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shop.Ly
          </Typography>
          {admin && (!auth.isAuthCustomer && !auth.isAuthAdmin) &&
            <div className={classes.rightContainer}>
              <Link to='/admin/login' className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button}>Login</Button>
              </Link>
            </div>}
            {!admin && (!auth.isAuthCustomer && !auth.isAuthAdmin) &&
            <div className={classes.rightContainer}>
              <Link to='/login' className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button}>Login</Button>
              </Link>
            </div>}
            {(auth.isAuthCustomer || auth.isAuthAdmin) && <Button variant="contained" color="primary" onClick={handleLogout} className={classes.button}>Logout</Button>}
        </Toolbar>
      </AppBar>
  );
}