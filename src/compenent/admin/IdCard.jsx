import React, { useEffect, useState } from 'react'
import id_card_front from '../../img/idcardfront.jpg'
import {hostVar} from '../reg/VarImportes'
import axios from 'axios'
import AdminLogIn from './AdminLogIn'
import { Link } from 'react-router-dom'



function IdCard() {
  const auth=JSON.parse(localStorage.getItem('auth'))

  const [membersInfo,setMembersInfo]=useState([])
  const pf=`${hostVar}/images/`


  useEffect(()=>{
    try {
        const fetchData=async()=>{
            const ListOfMembers=await axios.get(`${hostVar}/membersdata/listofmembers`)
            setMembersInfo(ListOfMembers.data)
        }
       fetchData()
    } catch (error) {
        console.log(error)
    }
   
    
    },[])
console.log(membersInfo)
  return auth=='okk'?  (
    <div className='id-card-con'>


{membersInfo.sort((a,b)=>b.id-a.id)?.map((m,index)=>( 
  
  <div className='id-card-item-con'>
  <img src={id_card_front} className='id-card-item-img' alt="" />
  <div className='id-card-item-logo'></div>
  <div className='id-card-item-brand-name'>Boreaf Development And Assistant Assoc.</div>
  <img src={pf +m?.personal_img}  className='id-card-item-profile-img' alt="" />
  <div className='id-card-item-person-name'>{m.name} {m.father_name}</div>
  <div className='id-card-item-person-contact0'>ID Number   : {m?.personal_id}</div>
  <div className='id-card-item-person-contact1'>Phone 1  : {m?.phone_number}</div>
  <div className='id-card-item-person-contact2'>Phone 2  : {m?.home_cell_phone_number}</div>




  </div>
))}


   
   

  
   



   
   

    

    </div>
  ):<AdminLogIn/>
}

export default IdCard