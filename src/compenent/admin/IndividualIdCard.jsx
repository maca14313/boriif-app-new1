import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import {hostVar} from '../reg/VarImportes';
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn';
import id_card_front from '../../img/idcardfront.jpg'


function IndividualIdCard() {
    const auth=JSON.parse(localStorage.getItem('auth'))

    const [regInfo,setRegInfo]=useState('')
   
    const [wait,setWait]=useState(0)
   
    const [file_img,setFile_img] = useState()


    const {id}=useParams()
    const effectRan = useRef(false);

    const pf=`${hostVar}/images/`


    useEffect(() => {
        const fetchData=async()=>{
          try {
            const fetchMember=await axios.get(`${hostVar}/membersdata/fetchmemberbyid/${id}`)
            setRegInfo(fetchMember.data)
          } catch (error) {
            
          }
         
        } 
    
        fetchData()
    
    },[wait]);

    return auth=='okk'?  (
        <div className='id-card-con id-card-individual-con'>
    
    
      
      <div className='id-card-item-con'>
      <img src={id_card_front} className='id-card-item-img' alt="" />
      <div className='id-card-item-logo'></div>
      <div className='id-card-item-brand-name'>Boreaf Development And Assistant Assoc.</div>
      <img src={pf +regInfo?.personal_img}  className='id-card-item-profile-img' alt="" />
      <div className='id-card-item-person-name'>{regInfo.name} {regInfo.father_name}</div>
      <div className='id-card-item-person-contact0'>ID Number   : {regInfo.personal_id}</div>
      <div className='id-card-item-person-contact1'>Phone 1  : {regInfo?.phone_number}</div>
      <div className='id-card-item-person-contact2'>Phone 2  : {regInfo?.home_cell_phone_number}</div>
    
    
    
    
      </div>
    
    
       
       
    
      
       
    
    
    
       
       
    
        
    
        </div>
      ):<AdminLogIn/>
}

export default IndividualIdCard