import React, { useEffect, useState } from 'react'
import './reg.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {hostVar} from './VarImportes'

function LogInMember() {
    const navigate = useNavigate()
    const [language,setLanguage]=useState(JSON.parse(localStorage.getItem('language'))?JSON.parse(localStorage.getItem('language')):'1')


    
    const [id,setId]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
   
    const [regData,setRegData]=useState('');
    const [loading,setLoading]=useState(0)


   
/*************************************************************************************************/

 
    const registerMember=async(e)=>{
        setLoading(1)
        e.preventDefault()
                try {
                      const memberData=await axios.post(`${hostVar}/membersdata/loginmember`,{
                  id,
                  phoneNumber,
                 
  
                  
                })
                 
                setRegData(memberData.data)
                if (memberData.data!='') {
                    setLoading(0)
                }
                
  
                    } catch (error) {
                        console.log(error)
  
                     }
                     }
        
/*************************************************************************************************/

    useEffect(() => {

        if (regData?.registerd!=undefined) {
            localStorage.setItem('regInfo',JSON.stringify(regData))
            navigate('/')
           } else {
            
           }
    },[regData]);

  return (
    <div className='regCon payment-page-info-list'>

    <form action="" className='formCon payment-page-info-list' onSubmit={registerMember}>
    <div style={{display:loading==1?'block':'none',color:'lightgray'}}>Loading....  </div>          

         <div style={{color:'red'}}>{regData?.response} <span style={{color:'yellow'}}>{regData?.registerd}</span> </div>

         <input className='row payment-page-info-list' type="text" onChange={(e)=>setId(e.target.value)} placeholder='id'  required/>
         <input className='row payment-page-info-list' type="number" onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='phone Number 1'  required/>
     
         <button className='row regBtn' type="submit">Log In</button>



    </form>
 </div>

  )
}

export default LogInMember