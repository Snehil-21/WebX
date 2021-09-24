import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    zIndex: 0,
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
  },
  link: {
    textDecoration: 'none',
  }
}));

export default function ButtonAppBar({ showLogin }) {
  const classes = useStyles();
  const auth = useSelector(state => state.Auth);
  // console.log(auth)
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Meet.Ly
          </Typography>
          {showLogin && !auth.isAuth &&
            <div className={classes.rightContainer}>
              <Link to='/login' className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button}>Login</Button>
              </Link>
            </div>}
            {auth.isAuth && <p onMouseOver={() => console.log('hover')} style={{color: 'purple', fontWeight: '600'}} className={classes.rightContainer}>{auth.fullName}</p>}
        </Toolbar>
      </AppBar>
    </div>
  );
}