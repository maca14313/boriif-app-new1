import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn'
import Moment from 'react-moment';
import moment from 'moment';



function MembersPaymentHistory() {
    const regInfo=JSON.parse(localStorage.getItem('regInfo')) 
    const auth=JSON.parse(localStorage.getItem('auth'))


    const [membersInfo,setMembersInfo]=useState([])
    const [info,setInfo]=useState('')
    const [searchText,setSearchText]=useState('')
    const [monthsDifference,setMonthsDifference]=useState('') 
    const [all_type_of_payment,setAll_type_of_payment]=useState() 
    const [loading,setLoading]=useState(0)
    const [updated,setUpdated]=useState(0)
    const [monthly_fee,setMonthly_fee]=useState('')
    const [monthly_fee_res,setMonthly_fee_res]=useState('')
    const [monthly_fee_get,setMonthly_fee_get]=useState([])








  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    try {
        const fetchData=async()=>{
            const ListOfMembers=await axios.get(`${hostVar}/membersdata/listofmembers`)
            setMembersInfo(ListOfMembers.data)

        const fetch_type_of_payment_all_total=await axios.get(`${hostVar}/membersdata/fetchmemberpaymenttype`)
        setAll_type_of_payment(fetch_type_of_payment_all_total.data)
        console.log(fetch_type_of_payment_all_total.data)
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

    useEffect(() => {
       const search=async()=>{
         try {
          const get_monthly_fee=await axios.get(`${hostVar}/membersdata/getmonthlyfee`)
          setMonthly_fee_get(get_monthly_fee.data)
         } catch (error) {
           
         }
        }
        search()
     }, [monthly_fee_res,updated]);

    const setMonthlyPaymentInfo=async(e)=>{
      console.log(monthly_fee)
      setLoading(1)
      e.preventDefault()
          const set_monthly_fee=await axios.post(`${hostVar}/membersdata/setmonthlyfee`,{
            monthly_fee:monthly_fee
          })
      setMonthly_fee_res(set_monthly_fee.data)
    console.log(set_monthly_fee.data)

    if(set_monthly_fee.data=='success'){
  setLoading(0)
  setUpdated(1)

    }
       
     

     }
        
  return auth=='okk'? (
    <div className='regCon regConList'>
         
          <h3 className='titleOfProfile payment-page-info-list '><h3>Payment Page</h3>  </h3>
 
            


          <form  className='formCon regConDelete regConDeleteAllPaymentInfo' style={{boxShadow:'0px 0px 0px'}}  >
    
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Amount Payed :</h4><span className='margin_left5 white_space'>{all_type_of_payment?.total_all_payment}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Registration  :</h4><span className='margin_left5 white_space'>{all_type_of_payment?.total_registration}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Donation  :</h4><span className='margin_left5 white_space'>{all_type_of_payment?.total_donation}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Monthly  :</h4><span className='margin_left5 white_space'>{all_type_of_payment?.total_monthly}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Members  :</h4><span className='margin_left5 white_space'>{membersInfo?.length}</span></div> 
    

 </form>

 <form  className='formCon regConDelete regConPaymentInfo' onSubmit={(e)=>(setMonthlyPaymentInfo(e))} style={{boxShadow:'0px 0px 0px'}}  >
 <div style={{display:loading==1?'block':'none',color:'lightgray'}}>Loading....  </div>   
 <div style={{display:updated==1?'block':'none',color:'yellow'}}>updated</div>          
       
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 margin-top5  border-none'><h4 className='font-weight500 white_space'>Monthly Fee  :</h4><input className='monthlyFeeInput margin_left10  ' type="number" placeholder={monthly_fee_get[0]?.monthly_payment} onChange={(e)=>setMonthly_fee(e.target.value)} required /><span className='margin_left5 white_space' ><button type='submit' className='monthly-btn'>set</button></span></div> 

     </form>



             <div className='formCon listOfMembersCon listOfMembersConSearch'>
             <input className='row listCon ' type="text" placeholder='🔎  by name or phone number' onChange={(e)=>setSearchText(e.target.value)} />
             </div>
             
             <div className='formCon formConUpdate regConDelete deleteMemberConPayment payment-page-info-list-item ' > <Link to={`/idcard`} className='deleteMemberConPaymentText payment-page-info-list '>Id-cards  ➡️</Link> </div>

             <div  className='formCon listOfMembersCon' >
       <div className='row listCon payment-page-info-list-border-none' ><div className='payment-page-info-list'><span className='spanOfList payment-page-info-list'><div className='margin_right10 font-size14' style={{color:'#00c8ff'}}>no</div>Name</span> </div> <span>
       Advance/Debt </span> </div>    
        

    </div>
          {membersInfo.sort((a,b)=>b?.payed_months-moment(new Date()).diff(moment(`'${b?.register_date}'`),'months')-a?.payed_months-moment(new Date()).diff(moment(`'${a?.register_date}'`),'months'))?.map((m,index)=>(

      
  <Link to={`/individualreceipts/${m.personal_id}`} key={m?.id}>
     <div  className='formCon listOfMembersCon' >
       <div className='row listCon payment-page-info-list payment-page-info-list-border-none' ><div><span className='spanOfList font-size14 payment-page-info-list'><div className='margin_right10 payment-page-info-list ' style={{color:'#00c8ff'}}>{index+1}</div>{m?.name}  <span className='margin_left10 payment-page-info-list'>{m.father_name}</span> </span> </div> <span style={{color:m?.payed_months >= moment(new Date()).diff(moment(`'${m?.register_date}'`),'months')?'yellow':'rgb(247, 80, 80)'}}>{
           m?.payed_months > moment(new Date()).diff(moment(`'${m?.register_date}'`),'months')?
        m?.payed_months-moment(new Date()).diff(moment(`'${m?.register_date}'`),'months'):

             m?.payed_months < moment(new Date()).diff(moment(`'${m?.register_date}'`),'months') ?
             m?.payed_months-moment(new Date()).diff(moment(`'${m?.register_date}'`),'months'):

            m?.payed_months == moment(new Date()).diff(moment(`'${m?.register_date}'`),'months') ?
             moment(new Date()).diff(moment(`'${m?.register_date}'`),'months')-m?.payed_months:''

            
      }</span> </div>    
        

    </div>
  </Link> 
 
    ))}
 
 </div>    
  ):<AdminLogIn/>
}

export default MembersPaymentHistory