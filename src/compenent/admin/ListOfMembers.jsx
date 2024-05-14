import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn'



function ListOfMembers() {
    const regInfo=JSON.parse(localStorage.getItem('regInfo')) 
    const auth=JSON.parse(localStorage.getItem('auth'))


    const [membersInfo,setMembersInfo]=useState([])
    const [info,setInfo]=useState('')
    const [searchText,setSearchText]=useState('')


  // eslint-disable-next-line react-hooks/exhaustive-deps
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

   

    useEffect(() => {
     if (searchText!='') {
      const search=async()=>{
        try {
          const searchMembers=await axios.get(`${hostVar}/membersdata/searchbyname/${searchText}`)
           setMembersInfo(searchMembers.data)
  
        } catch (error) {
          
        }
       }
       search()
     }
    }, [searchText]);



   
        
  return auth=='okk'? (
    <div className='regCon regConList payment-page-info-list'>
         
          <h3 className='titleOfProfile'><h3>List Of Members</h3> <span className='membersLength'>{membersInfo?.length}</span> </h3> 
            
             <div className='formCon listOfMembersCon listOfMembersConSearch'>
             <input className='row listCon payment-page-info-list ' type="text" placeholder='🔎  by name or phone number' onChange={(e)=>setSearchText(e.target.value)} />
             </div>
             
             <div className='formCon formConUpdate regConDelete deleteMemberConPayment payment-page-info-list-item ' > <Link to={`/idcard`} className='deleteMemberConPaymentText payment-page-info-list'>Id-cards  ➡️</Link> </div>
          {membersInfo.sort((a,b)=>b.id-a.id)?.map((m,index)=>(

      
       
  <Link to={`/adminupdatemember/${m.personal_id}`} key={m?.id}>
     <div  className='formCon listOfMembersCon payment-page-info-list' >
       <div className='row listCon payment-page-info-list payment-page-info-list-border-none' ><div><span className='spanOfList payment-page-info-list'><div className='margin_right10' style={{color:'#00c8ff'}}>{index+1}</div>{m?.name}  <span className='margin_left10'>{m.father_name}</span> </span> </div> <span>{m?.phone_number}</span>   </div>    
        

    </div>
  </Link> 
 
    ))}
 
 </div>    
  ):<AdminLogIn/>
}

export default ListOfMembers