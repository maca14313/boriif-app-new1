import React, { useEffect, useState } from 'react'
import './regAdmin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {hostVar} from '../reg/VarImportes'
import AdminLogIn from './AdminLogIn'


function Registration() {
    const auth=JSON.parse(localStorage.getItem('auth'))

         const navigate = useNavigate()

    const [name,setName]=useState('')
    const [fatherName,setFatherName]=useState('')
    const [grandFatherName,setGrandFatherName]=useState('')
    const [gender,setGender]=useState('male')
    const [age,setAge]=useState('');
    const [work_type,setWork_type]=useState('');
    const [level_of_education,setLevel_of_education]=useState('');
    const [woreda,setWoreda]=useState('');
    const [kebele,setKebele]=useState('');
    const [residential_address,setResidential_address]=useState('');
    const [home_address,setHome_address]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('')
    const [home_cell_phone_number,setHome_cell_phone_number]=useState('');
    const [married,setMarried]=useState('');
    const [disability,setDisability]=useState('');
    const [representative,setRepresentative]=useState('');

   

    const [regData,setRegData]=useState('');
    const [goToProfile,setGoToProfile]=useState('')
    const [loading,setLoading]=useState(0)

   
              



   
/*************************************************************************************************/

 
    const registerMember=async(e)=>{
        setLoading(1)

        e.preventDefault()
                try {
                      const memberData=await axios.post(`${hostVar}/membersdata/registermember`,{
                  name,
                  fatherName,
                  grandFatherName,
                  gender,
                  age,
                  work_type,
                  level_of_education,
                  woreda,
                  kebele,
                  residential_address,
                  home_address,
                  phoneNumber,
                  home_cell_phone_number,
                  married,
                  disability,
                  representative,
                  
                  
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
   console.log(regData)
    useEffect(() => {

        if (regData?.registerd!=undefined) {
            //localStorage.setItem('regInfo',JSON.stringify(regData))
            navigate(`/adminupdatemember/${regData.id}`)
           } else {
            
           }
    },[regData]);

    console.log()
                     
  return auth=='okk'? (
 

 <div className='regCon regConMargin payment-page-info-list'>
          <h3 className='titleOfProfile margin-top20'>Member`s registration page</h3>

    <form action="" className='formCon payment-page-info-list margin-top10' onSubmit={registerMember}>
    <div style={{display:loading==1?'block':'none',color:'lightgray'}}>Loading....  </div>          

         <div style={{color:'red'}}>{regData?.response} <span style={{color:'yellow'}}>{regData?.registerd}</span> </div>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setName(e.target.value)}  placeholder='First name' minlength='4'  required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setFatherName(e.target.value)}  placeholder='Middle name' required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setGrandFatherName(e.target.value)} placeholder='Last name' required/>
        <div className='row updateRow payment-page-info-list'>
        <label style={{color:'lightgray',fontFamily:'Gill Sans'}} className='payment-page-info-list' htmlFor="Gender">Gender</label>
        <select className='margin_left10' onChange={(e) =>setGender(e.target.value)}   name="Gender" id="Gender">
            <option value="male" >Male</option>
            <option value="female" >Female</option>

        </select>
        </div>
   

        <input className='row payment-page-info-list' type="text" onChange={(e)=>setAge(e.target.value)}  placeholder='Age'  required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setWork_type(e.target.value)}  placeholder='Work type' required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setLevel_of_education(e.target.value)}  placeholder='Level of education'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setWoreda(e.target.value)}  placeholder='Woreda'  required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setKebele(e.target.value)}  placeholder='Kebele'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setResidential_address(e.target.value)}  placeholder='Residential address'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setHome_address(e.target.value)}  placeholder='Home address'  required/>
        <input className='row payment-page-info-list' type="number" onChange={(e)=>setPhoneNumber(e.target.value)}  placeholder='Phone number'   required/>
        <input className='row payment-page-info-list' type="number" onChange={(e)=>setHome_cell_phone_number(e.target.value)}  placeholder='Home cell phone number'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setMarried(e.target.value)}  placeholder='Married'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setDisability(e.target.value)}  placeholder='Disability'  required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setRepresentative(e.target.value)}  placeholder='Representative'   required/>


       

        

        <input  className='row regBtn' type="submit" placeholder='Register' />



    </form>
 </div>

  ):<AdminLogIn/>
}

export default Registration