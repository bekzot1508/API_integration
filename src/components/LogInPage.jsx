import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogInPage = () => {
    const [phone, setPhone] = useState("")
    const [parol, setParol] = useState("")
    // console.log(phone, parol);
    const navigate = useNavigate()
    const tokenJon = localStorage.getItem("accessToken")
    useEffect(()=> {
        if(tokenJon?.length > 27) {
            navigate("/home")
        } else {
            localStorage.removeItem("accessToken")
            navigate("/")
        }
    })
  const logInSubmit = (e) => {
    e.preventDefault()
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            phone_number: phone,
            password: parol
        }),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success === true) {
            localStorage.setItem("accessToken", data?.data?.tokens?.accessToken?.token)
            toast.success(data?.message)
            navigate("/home")
        } else {
            toast.error(data?.message)
        }
       
    })
    .catch((error) => {
        console.log(error.message);
    })
    
  }

  return (
    <div>
        <form >
            <input type="text" placeholder='number'required onChange={(e) => setPhone(e?.target?.value)} />
            <input type="text" placeholder='password'required onChange={(e) => setParol(e?.target?.value)}/>
            <button onClick={logInSubmit} type='submit'>LogIn qilish</button>
        </form>
    </div>
  )
}

export default LogInPage