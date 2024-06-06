import { ToastContainer } from 'react-toastify';
import {Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
 
import './App.css'
import LogInPage from './components/LogInPage'
import Cities from './components/Cities';
import Categories from './components/Categories';

function App() {
 

  return (
    <>
       
       <Routes>
        <Route path='/' element={<LogInPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/cities' element={<Cities/>}/>
        <Route path='/categories' element={<Categories/>}/>
      </Routes>
       <ToastContainer/>
       
    </>
  )
}

export default App
