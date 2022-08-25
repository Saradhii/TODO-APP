import React from 'react';
import "./styles.css";
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Header = () => {
   
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    window.location.href="./login";
    };
    var token = localStorage.getItem("TodoLogintoken");
    const handleLogout =()=>{
      localStorage.removeItem("TodoLogintoken");
      localStorage.removeItem("TodoLoginid");
      setOpen(true);
    }

  return (
    <>
    {token ? 
    <div className='header'>
      <Link to="./logout"><h1 onClick={handleLogout}>LOGOUT</h1></Link>
      <Link to="/todos"><h1>TODO'S</h1></Link> 
    </div> : 
    <div className='header'>
     <Link to="/login"><h1>LOGIN</h1></Link>
     <Link to="/signup"><h1>SIGN-UP</h1></Link> 
    </div>}
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">User Logged out successfully</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default Header