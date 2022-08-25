import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Todo from './components/Todos/Todos';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import UpdateTodo from './components/Todos/UpdateTodo';


function App() {
  return (
    <>
    <Header/>
    <Routes>
        <Route default path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/todos' element={<Todo/>}/>
        <Route path='/update/:id'element={<UpdateTodo/>}/>
    </Routes>
    </>
  );
}

export default App;
