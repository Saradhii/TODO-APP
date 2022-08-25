import React from 'react';
import { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Signup = () => {
    const [formData, Setformdata] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
      window.location.href="./login";
    };
   

    const handleChange = (e)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        [name]: e.target.value,
        [name]: e.target.value,
        [name]: e.target.value,
    });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData)
        axios.post(`https://js-backend-mock10.herokuapp.com/user/signup`, formData, {
            headers: { "Content-Type": "application/json" },
          }).then((responce) => {
            const { data } = responce;
            console.log(data);
            setOpen(true);
          });
      };
  return (
    <>
        <>
    <div className='signuppage'>
      <div>
        <h1>SIGN-UP</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type="text" className='fname' name="name" onChange={handleChange} placeholder="Your name.." required />

         <label htmlFor="email">Email</label>
         <input type="text" className='lname' name="email" onChange={handleChange} placeholder="Your email.." required/>

         <label htmlFor="password">Password</label>
         <input type="text" className='lname' name="password" onChange={handleChange} placeholder="Your password.." required/>
         
         <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>

    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">Registration success., now login</Alert>
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
    </>
  )
}

export default Signup