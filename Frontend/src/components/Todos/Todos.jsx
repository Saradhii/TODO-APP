import React from 'react'
import Login from '../Login/Login';
import { useState,useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Link} from "react-router-dom";


const Home = () => {
  const token = localStorage.getItem("TodoLogintoken");
  const userid = localStorage.getItem("TodoLoginid");
  const [data,setData] =useState([]);
  const [todo,setTodo] =useState([]);
  const [formData, Setformdata] = useState({});

  //alert messages
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const handleClose = () => {
      window.location.reload();
      setOpen(false);
    };
    const handleClose1 = () => {
      window.location.reload();
      setOpen1(false);
    };
 
  //changes on input
  const handleChange = (e)=>{
      let name = e.target.name;
      Setformdata({
      ...formData,
      id:userid,
      [name]: e.target.value,
      [name]: e.target.value,
      [name]: e.target.value,
  });
  }

  //open form for new todo
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  //close form
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  // pending todos
  function pendingTodos() {
    const getdata= async()=>{
      let res = await fetch(`https://js-backend-mock10.herokuapp.com/todo/allpending/${userid}`,{
          method:"GET",
        });
        let data = await res.json();
        console.log(data);
        setTodo(data);
   }
   getdata(); 
  }
  
  // get all existing todos
  useEffect(() => {
    const getdata= async()=>{
       let res = await fetch(`https://js-backend-mock10.herokuapp.com/user/singleuser/${userid}`,{
           method:"GET",
         });
         let data = await res.json();
         setData(data);
    }
    getdata();
 }, []);

 // get logged in user data
 useEffect(() => {
  const getdata= async()=>{
     let res = await fetch(`https://js-backend-mock10.herokuapp.com/todo/all/${userid}`,{
         method:"GET",
       });
       let data = await res.json();
       setTodo(data);
  }
  getdata();
}, []);

 // post new todo to database
 const handleSubmit = (e)=>{
  e.preventDefault();
  console.log(formData);
  axios.post(`https://js-backend-mock10.herokuapp.com/todo/newtodo`, formData, {
      headers: { "Content-Type": "application/json" },
    }).then((responce) => {
      const { data } = responce;
      setOpen1(true);
    });
};

//deleting a todo
const deleteItem = async (id) => {
  console.log(id);
  let res = await fetch(`https://js-backend-mock10.herokuapp.com/todo/delete/${id}`, {
    method: "DELETE",
  });
  setOpen(true);
};

 

  return (
    <>{token ? <>
     <div className='homeprofile'>
        <div className='divform'>
           <div className='profdetails'>
            <div><img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="user" /></div>
            <div>
              {data && data.map((e)=>{
                return (
                  <>
                  <h4>{e.name}</h4>
                  <h4>{e.email}</h4>
                  </>
                )
              })}
            </div>
           </div>
        </div>
        <div className='todos'>
          <div className='todoheader'>
              <div><h1>YOUR TODO'S</h1></div>
              <div>
                <button className='open-button' onClick={openForm}>Create new todo</button>
                <button className='open-button' onClick={pendingTodos}>Pending Todo's</button>
              </div>
          </div>
          <div className='tododata'>
                  <div>
                  <h3>Task name</h3>
                  <h3>Status</h3>
                  <h3>Tag</h3>
                  <h3>Edit</h3>
                  <h3>Delete</h3>
                  </div>
              {todo && todo.map((e)=>{
                return(
                  <>
                  <div>
                  <h3>{e.todoTask}</h3>
                  <h3>{e.todoStatus}</h3>
                  <h3>{e.todoTag}</h3>
                  <button className='edit'><Link to={`/update/${e._id}`}>Edit</Link></button>
                  <button className='delete' onClick={() => {deleteItem(e._id)}}>Delete</button>
                  </div>
                  </>
                )
              })}
          </div>
        </div>
     </div>
    </>:<Login/>}
    <div className="form-popup" id="myForm">
         <form className="form-container" onSubmit={handleSubmit}>
         <h1>New Todo</h1>

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
        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
       </form>
     </div>
     <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="error">Todo deleted</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    
    <Dialog open={open1} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">New todo added</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>
    
  )
}

export default Home