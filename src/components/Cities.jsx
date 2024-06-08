import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import {  NavLink } from 'react-router-dom'
import HomePage from './HomePage.jsx'

const Cities = () => {
    const [category, setCategory] = useState([])
    const [data, setdata] = useState({name:"", text:"", images:null})
    // console.log(category);
  
    const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzU3ODI4NywiZXhwIjoxNzQ5MTE0Mjg3fQ.I7H1QJJsao6-Ab9LkoyDq4t3WeP10L6XsD8zKWlYJno"
  
    const getCategory = () => {
      fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
      .then(res => res.json())
      .then(category => {
        setCategory(category?.data);
      })
    }
  
  
     
    const createCategory = (e) => {
         e.preventDefault()   
         const formData = new FormData();
         formData.append("name", data.name)
         formData.append("text", data.text)
         formData.append("images", data.images)
         fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities", {
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
           document.getElementById("myForm2").reset()
         })
         .catch(err => {
        //   console.log(err);
         })
    }
  
    useEffect(() => {
      getCategory()
    }, [])
  
  return (
    <div className="city">
       <HomePage/>
        <form id="myForm2" onSubmit={createCategory}>
            <input type="text" onChange={(e) => setdata({...data, name:e.target.value})}/>
            <input type="text"  onChange={(e) => setdata({...data, text:e.target.value})}/>
            <input type="file"  onChange={(e) => setdata({...data, images:e.target.files[0]})} />
            <button type='submit'>send</button>
        </form>
        <br />
        <hr />
        <br />
        <h1>Cities</h1>
        {
            category.map((item, index) => (
                <div key={index}>
                   <img style={{width:"200px"}} src={`${urlImage}${item?.image_src}`} alt={item?.name} />
                    <h3>{item?.name}</h3>
                    <h3>{item?.text}</h3>
                </div>
                
            ))
        }

      
    </div>
  )
}

export default Cities