/* eslint-disable react/jsx-key */
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import {  NavLink } from 'react-router-dom'

const Categories = () => {
  const [category, setCategory] = useState([])
  const [data, setdata] = useState({name_en:"", name_ru:"", images:null})
//   console.log(category);

  const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzU3ODI4NywiZXhwIjoxNzQ5MTE0Mjg3fQ.I7H1QJJsao6-Ab9LkoyDq4t3WeP10L6XsD8zKWlYJno"

  const getCategory = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
    .then(res => res.json())
    .then(category => {
      setCategory(category?.data);
    })
  }


   
  const createCategory = (e) => {
       e.preventDefault()   
       const formData = new FormData();
       formData.append("name_en", data.name_en)
       formData.append("name_ru", data.name_ru)
       formData.append("images", data.images)
       fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
         headers: {
            Authorization: `Bearer ${token}`
         },
         method: 'POST', 
         body: formData
       })
       .then(res => res.json())
       .then(res=>{
         getCategory()
         toast.success("yangi element qo'shildi") // bu funksiya chaqirilgani uchun re-fresh bermasa ham elemenrlar qo'shilaveradi
         document.getElementById("myForm").reset()
       })
       .catch(err => {
        // console.log(err);
       })
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div className='city'>
        <form id="myForm" onSubmit={createCategory}>
            <input type="text" onChange={(e) => setdata({...data, name_en:e.target.value})}/>
            <input type="text"  onChange={(e) => setdata({...data, name_ru:e.target.value})}/>
            <input type="file"  onChange={(e) => setdata({...data, images:e.target.files[0]})} />
            <button type='submit'>send</button>
        </form>
        <NavLink to={"/"}>
               Home
        </NavLink> 
        <br />
        <hr />
        <br />
        <h1>Categories</h1>
        {
            category.map((item, index) => (
                <div key={index}>
                  <img style={{width:"200px"}} src={`${urlImage}${item?.image_src}`} alt={item?.name_en} />
                    <h3>{item?.name_en}</h3>
                </div>
                
            ))
        }
    </div>
  )
}

export default Categories