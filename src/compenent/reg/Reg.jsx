import React, { useEffect, useState } from 'react'
import './reg.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {hostVar} from './VarImportes'

function Reg() {

         const navigate = useNavigate()
         const [language,setLanguage]=useState(JSON.parse(localStorage.getItem('language'))?JSON.parse(localStorage.getItem('language')):'1')


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
    const [married,setMarried]=useState('yes');
    const [disability,setDisability]=useState('no');
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
            localStorage.setItem('regInfo',JSON.stringify(regData))
            navigate(`/profile/${regData.id}`)
           } else {
            
           }
    },[regData]);

    console.log()
                     
  return (
 

 <div className='regCon regConMargin payment-page-info-list'>
          <h3 className='titleOfProfile margin-top20 payment-page-info-list'>Fuula galmee haaraa</h3>

    <form action="" className='formCon margin-top10 payment-page-info-list' onSubmit={registerMember}>
    <div style={{display:loading==1?'block':'none',color:'lightgray'}}>Loading....  </div>          

         <div style={{color:'red'}}>{regData?.response} <span style={{color:'yellow'}}>{regData?.registerd}</span> </div>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setName(e.target.value)}  placeholder='Maqaa' minlength='4'  required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setFatherName(e.target.value)}  placeholder='Maqaa abbaa' required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setGrandFatherName(e.target.value)} placeholder='Maqaa akaakayyu' required/>
        <div className='row updateRow payment-page-info-list'>
        <label style={{color:'lightgray',fontFamily:'Gill Sans'}} className='payment-page-info-list' htmlFor="Gender">Koorniyaa</label>
        <select className='margin_left10' onChange={(e) =>setGender(e.target.value)}   name="Gender" id="Gender">
            <option value="male" >Dhiira</option>
            <option value="female" >Durba</option>

        </select>
        </div>
   

        <input className='row payment-page-info-list' type="text" onChange={(e)=>setAge(e.target.value)}  placeholder='Umrii'  required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setWork_type(e.target.value)}  placeholder='Gosii hojii' required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setLevel_of_education(e.target.value)}  placeholder='Sadarkaa barnootaa'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setWoreda(e.target.value)}  placeholder='Aanaa'  required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setKebele(e.target.value)}  placeholder='Qebele'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setResidential_address(e.target.value)}  placeholder='Mandara'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setHome_address(e.target.value)}  placeholder='Bakka mana jireenyaa'  required/>
        <input className='row payment-page-info-list' type="number" onChange={(e)=>setPhoneNumber(e.target.value)}  placeholder='Lakkoofsa bilbilaa'   required/>
        <input className='row payment-page-info-list' type="number" onChange={(e)=>setHome_cell_phone_number(e.target.value)}  placeholder='Lakkoofsa bilbila mana'   required/>
        <input className='row payment-page-info-list' type="text" onChange={(e)=>setRepresentative(e.target.value)}  placeholder='Bakka bu`aa'   required/>

        <div className='row updateRow payment-page-info-list'>
        <label style={{color:'lightgray',fontFamily:'Gill Sans'}} className='payment-page-info-list' htmlFor="Married">Kan fuudhe/Kan heerumtee</label>
        <select className='margin_left10' onChange={(e) =>setMarried(e.target.value)}   name="Married" id="Married">
            <option value="yes" >Eee</option>
            <option value="no" >Lakki</option>

        </select>
        </div>
        <div className='row updateRow payment-page-info-list'>
        <label style={{color:'lightgray',fontFamily:'Gill Sans'}} className='payment-page-info-list' htmlFor="Disability">Qaama miidhamaa</label>
        <select className='margin_left10' onChange={(e) =>setDisability(e.target.value)}   name="Disability" id="Disability">
            <option value="no" >Eee</option>
            <option value="yes" >Lakki</option>

        </select>
        </div>


       

        

        <input  className='row regBtn' type="submit" placeholder='Galmaa`i' />



    </form>
 </div>

  )
}

export default Reg