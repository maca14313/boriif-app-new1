import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {hostVar} from '../reg/VarImportes'


function AdminLogIn() {
    const navigate = useNavigate()

    
    const [id,setId]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
   
    const [regData,setRegData]=useState('');
    const registerMember=async(e)=>{
        e.preventDefault()
                if (id=='1234' && phoneNumber=='1234567890') {
                      localStorage.setItem('auth',JSON.stringify('okk'))
                      setRegData('loged in')
                      navigate('/adminhomepage')
                      window.location.reload(true)

                     
                } else {
                    console.log('false')
                    localStorage.setItem('auth',JSON.stringify('noo'))
                    setRegData('incorrect')

                }
                     }
    useEffect(() => {
     if (JSON.parse(localStorage.getItem('auth'))=='okk') {
        navigate('/adminhomepage')

     }

    },[regData])

  return (
<div className='regCon payment-page-info-list'>

<form action="" className='formCon payment-page-info-list' onSubmit={registerMember}>
<h3 className='titleOfProfile margin-top20'>Admin`s log in page</h3>

     <div > <span style={{color:regData=='loged in'?'yellow':'red'}}>{regData}</span> </div>

     <input className='row payment-page-info-list' type="text" onChange={(e)=>setId(e.target.value)} placeholder='id'  required/>
     <input className='row payment-page-info-list' type="number" onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='phone Number'  required/>
 
     <button className='row  regBtn' type="submit">Log In</button>



</form>
</div>
)
}

export default AdminLogIn