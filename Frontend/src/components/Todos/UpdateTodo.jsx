import React from 'react'
import Login from '../Login/Login';
import {Link} from "react-router-dom";
import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UpdateTodo = () => {
    const token = localStorage.getItem("TodoLogintoken");
    const {id} = useParams();

    const [formData, Setformdata] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
      window.location.href="/todos";
    };
     const handleChange = (e)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        [name]: e.target.value,
        [name]: e.target.value,
        [name]: e.target.value,
        [name]: e.target.value,
        [name]: e.target.value,
        [name]: e.target.value,
    });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        axios.patch(`https://js-backend-mock10.herokuapp.com/todo/edit/${id}`, formData, {
            headers: { "Content-Type": "application/json" },
          }).then((responce) => {
            const { data } = responce;
            setOpen(true);
          });
      };

  return (
    <>{token? <>
    <div className='updatetodo'>
      <div className='regtitle'>
        <h1>UPDATE TODO</h1>
      </div>
      <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label><b>Task name</b></label>
        <input type="text" placeholder="Enter your task" name="todoTask" onChange={handleChange} required/>

        <label><b>Status</b></label><br></br>
        <select name="todoStatus" class="status" onChange={handleChange}>
        <option value="">Select</option>
        <option value="Pending">Pending</option>
        <option value="Done">Done</option>
        </select>

        <label for="psw"><b>Tag</b></label><br></br>
        <select name="todoTag" class="tag" onChange={handleChange}>
        <option value="">Select</option>
        <option value="Personal">Personal</option>
        <option value="Offical">Offical</option>
        <option value="Family">Family</option>
        </select>
        <button type="submit" className="btn">Send</button>
       </form>
      </div>
    </div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">Todo updated</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>:<Login/>}
    </>
  )
}

export default UpdateTodo