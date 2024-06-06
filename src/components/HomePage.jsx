

import Categories from "./Categories"
import Cities from "./Cities"
import {Route, Routes } from 'react-router-dom'
import {  NavLink } from 'react-router-dom'
 

const HomePage = () => {


  return (
    <div>
      <div className="navbar">
              <NavLink to={"/cities"}>
                Cities
              </NavLink>
              <NavLink to={"/categories"}>
                Categories
              </NavLink>
      </div>
    </div>
  )
}

export default HomePage