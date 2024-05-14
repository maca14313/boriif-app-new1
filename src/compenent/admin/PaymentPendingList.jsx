import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
function PaymentPendingList() {
    const regInfo=JSON.parse(localStorage.getItem('regInfo')) 
    const auth=JSON.parse(localStorage.getItem('auth'))

    
    const [pendingPayment,setPendingPayment]=useState([0])
    const [info,setInfo]=useState('')
    const [searchText,setSearchText]=useState('')


  // eslint-disable-next-line react-hooks/exhaustive-deps
  
    const searchByName=async()=>{
      try {
        const searchMembers=await axios.get(`${hostVar}/membersdata/searchbyname/${searchText}`)
         setPendingPayment(searchMembers.data)

      } catch (error) {
        
      }
    }

    const searchByPhoneNumber=async()=>{
      try {
        const searchMembers=await axios.get(`${hostVar}/membersdata/searchbyphonenumber/${searchText}`)
         setPendingPayment(searchMembers.data)

      } catch (error) {
        
      }
    }

    useEffect(()=>{
        try {
            const fetchData=async()=>{
                const ListOfPendingPayment=await axios.get(`${hostVar}/membersdata/ppaymentapproval`)
                setPendingPayment(ListOfPendingPayment.data)
            }
           fetchData()
        } catch (error) {
            console.log(error)
        }
       
        
        },[])
  return (
<div className='regCon regConList'>
       
       <h3 className='titleOfProfile margin-bottom20 payment-page-info-list '><h4>List Of Pending Receipts</h4> <span className='membersLength'>{pendingPayment?.length}</span> </h3> 
         
         { /*<div className='formCon listOfMembersCon listOfMembersConSearch'>
          <input className='row listCon ' type="text" placeholder='type some ting' onChange={(e)=>setSearchText(e.target.value)} />
         <div className="searchByCon"> <div>Search by :-</div> <div className='searchByBtn' onClick={searchByName}>Name</div> <div className='searchByBtn' onClick={searchByPhoneNumber}>Number</div></div>
         </div> */}
          
        
                <div  className='formCon listOfMembersCon' >
       <div className='row listCon payment-page-info-list payment-page-info-list-border-none' ><div className='payment-page-info-list'><span className='spanOfList payment-page-info-list'><div className='margin_left10 font-size14' style={{color:'#00c8ff'}}>no</div><div className='margin_left10 font-size14'>TRN</div> <div className='margin_left10 font-size14'>Date of entry</div></span> </div> <span>
      </span> </div>    
        

    </div>
       {pendingPayment!=[0]?pendingPayment?.map((m,index)=>(

   
    
<Link to={`/individualreceipts/${m?.personal_id}`} key={m?.id}>
  <div  className='formCon listOfMembersCon payment-page-info-list payment-page-info-list-border-none' >
    <div className='row listCon updatelabel payment-page-info-list payment-page-info-list-border-none margin-bottom20 font-size15' ><div><span className='spanOfList payment-page-info-list'><div className='margin_right10 white_space payment-page-info-list' style={{color:'#00c8ff'}}>{index+1}</div>{m?.trn}  <span className='margin_left10 white_space'>{m?.date_of_entry}</span> </span> </div> </div>    
    
 </div>
</Link> 

 )):''  }

</div>      )
}

export default PaymentPendingList