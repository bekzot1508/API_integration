/* eslint-disable react/jsx-key */
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import {  NavLink } from 'react-router-dom'
import { Modal, message } from 'antd';
import HomePage from './HomePage.jsx'

const Categories = () => {
  const [category, setCategory] = useState([])
  const [data, setdata] = useState({name_en:"", name_ru:"", images:null})
  const [datas, setdatas] = useState({name_en:"", name_ru:"", images:null})
  const [open, setOpen] = useState(false)
  const [id, setid] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
//   console.log(category);

//  GET
  const urlImage = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzU3ODI4NywiZXhwIjoxNzQ5MTE0Mjg3fQ.I7H1QJJsao6-Ab9LkoyDq4t3WeP10L6XsD8zKWlYJno"

  const getCategory = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
    .then(res => res.json())
    .then(category => {
      setCategory(category?.data);
    })
  }


  //  POST
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

  // DELETE
  const handleOpen = (id) => {
    setid(id)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setEditOpen(false)
  }

  const deleteCategory = (e) => {
    e.preventDefault()
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        setOpen(false)
        message.success("O'chirildi")
        const newCategory =  category.filter(item => item.id !== id)
        setCategory(newCategory)
      } else {
        message.error("O'chirilmadi")
      }
    })
    .catch((err) => {
      console.log("Xatolik", err);
    })
  }

  //  EDIT
  const showEdit = (item) => {
    setid(item.id)
    setdatas({...datas, name_en:item.name_en, name_ru:item.name_ru, images:item.image_src})
    setEditOpen(true)
  }

  const editCategory = (e) => {
    const formData2 = new FormData();
    formData2.append("name_en", datas.name_en)
    formData2.append("name_ru", datas.name_ru)
    formData2.append("images", datas.images)
    e.preventDefault()
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "PUT",
      body: formData2
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setEditOpen(false)
        message.success("edited")
        getCategory()
      } else {
        message.error("xatolik")
      }
    })
    .catch(err => {
      console.log("error", err);
    })
  }

  return (
    <div className='city'>
      <HomePage/>
        <form id="myForm" onSubmit={createCategory}>
            <input type="text" onChange={(e) => setdata({...data, name_en:e.target.value})}/>
            <input type="text"  onChange={(e) => setdata({...data, name_ru:e.target.value})}/>
            <input type="file"  onChange={(e) => setdata({...data, images:e.target.files[0]})} />
            <button type='submit'>send</button>
        </form>
     
        <br />
        <hr />
        <br />
        <h1>Categories</h1>
        <table border={1}>
           <tr style={{width:"1440px"}}>
             <th style={{width:"300px"}}>Name en</th>
             <th style={{width:"300px"}}>Name ru</th>
             <th style={{width:"400px"}}>images</th>
             <th style={{width:"300px"}}>actions</th>
           </tr>
           {
            category.map((item, index) => (
              <tr key={index}>
                 <td>{item.name_en}</td>
                 <td>{item.name_ru}</td>
                 <td>
                   <img style={{width:"400px"}} src={`${urlImage}${item?.image_src}`} alt={item?.name_en} />
                 </td>
                 <td>
                  <button onClick={() => handleOpen(item.id)}>Delete</button>
                     <br /> <br /> <br />
                  <button onClick={() => showEdit(item)}>Edit</button>
                 </td>
              </tr>
            ))
           }
        </table>
        <Modal title="Delete" open={open} onOk={handleOpen} onCancel={handleClose} footer={null}>
            <h2>O'chirilsinmi?</h2>
            <button onClick={handleClose}>Cancel</button> 
              <br />
            <button onClick={deleteCategory}>Delete</button>
       </Modal>
        <Modal title="Edit" open={editOpen} onOk={showEdit} onCancel={handleClose} footer={null}>
            <form action="" onSubmit={editCategory}>
              <label htmlFor="">name en</label> <br />
               <input type="text" placeholder='name en' value={datas.name_en} onChange={(e) => setdatas({...datas, name_en: e.target.value})}/>
                <br />
                <br />
                <label htmlFor="">name ru</label> <br />
               <input type="text" placeholder='name ru' value={datas.name_ru} onChange={(e) => setdatas({...datas, name_ru: e.target.value})}/>
               <br />
                <br />
               <input type="file"  onChange={(e) => setdatas({...datas, images: e.target.files[0]})}/>
               <br />
               <br />
               <button type='submit' >Edit</button>
            </form>
            <button onClick={handleClose}>Cancel</button>             
       </Modal>
    </div>
  )
}

export default Categories