import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import AuthButtonCSS from './AuthButton.module.css'
// import LockOpenIcon from '@material-ui/icons/LockOpen';
// import LockIcon from '@material-ui/icons/Lock';

import auth from '../services/auth';



const AuthButton = withRouter(({ history }) => {
  if(!auth.isAuthenticated) {
    return <div>
                
                <Link className={`btn ${AuthButtonCSS.login}`} to="/log-in">Log In </Link> {/* <LockOpenIcon style={{color:"ForestGreen"}}/> */}
                <Link className={`btn ${AuthButtonCSS.signup}`} to="/Register">Register</Link>
            </div>
  }

  const logout = () => {
    auth.signout().then(() => history.push('/'));
  }
//   let message = `Welcome ${auth.user.userName}`
  return (
    <div>
      {/* <span  className={AuthButtonCSS.welcome}>{message}</span>   */}
      <button className={`btn ${AuthButtonCSS.logout}`} onClick={logout}>Log Out</button> 
      {/* <LockIcon/> */}
    </div>
  );
});

//Welcome! {auth.user.userName}
export default AuthButton;