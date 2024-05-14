import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn';
import Moment from 'react-moment';
import moment from 'moment';


function IndividualReceipts() {
    const auth=JSON.parse(localStorage.getItem('auth'))

    
   

    const [regInfo,setRegInfo]=useState('')
    const [p_Payment,setP_Payment]=useState([0])
    const [p_Payment_P,setP_Payment_P]=useState([])
    const [added_months,setAdded_months]=useState('')
    const [monthsDifference,setMonthsDifference]=useState('') 
    const [ad_payment,setAd_payment]=useState('')
    const [d_payment,setAD_payment]=useState('')
    const [open_choose,setOpen_choose]=useState(false)




    const [type_of_payment_total,setType_of_payment_total]=useState()
    const [updateRes,setUpdateRes]=useState('')
    const [openModal,setOpenModal]=useState(false)
    const [openModal2,setOpenModal2]=useState(false)
    const [openModal3,setOpenModal3]=useState(false)


    const [receiptId,setReceiptId]=useState('')
    const [newAmount,setNewAmount]=useState('')
    const [regNumber,setRegNumber]=useState(false)


    const {id}=useParams()
    const effectRan = useRef(false);



    
    const[trn,setTrn]=useState('')
    const [amount,setAmount]=useState('')
    const [bank,setBank]=useState('')
    const [type_of_payment,setType_of_payment]=useState('')
    const [loading,setLoading]=useState(0)
   
    const [paymentData,setPaymentData]=useState('');

   
   

       

       const navigate=useNavigate()
       
       const aprrovePayment=async(e)=>{
        e.preventDefault()
        setLoading(1)
        console.log(receiptId)
           if (type_of_payment=='monthly') {
            const approveData=await axios.put(`${hostVar}/membersdata/acceptaprrovalmonthly/${receiptId}/${regInfo?.id}`,{
              newAmount:newAmount,
            })
           if(approveData!=''){
            setLoading(0)
           }
           } else {
            const approveData=await axios.put(`${hostVar}/membersdata/acceptaprroval/${receiptId}/${regInfo?.id}`,{
              newAmount:newAmount,
            })
           if(approveData!=''){
            setLoading(0)
           }
           }
       

       }

       const deletePayment=async()=>{
        console.log(JSON.parse(regInfo?.total_amount_payed)-JSON.parse(newAmount))
        
      const dAmount=JSON.parse(regInfo?.total_amount_payed)-JSON.parse(newAmount)
      const new_added_months=JSON.parse(regInfo?.payed_months)-JSON.parse(added_months)
      console.log(Math.floor(dAmount/500))

       const approveData=await axios.put(`${hostVar}/membersdata/deleteaprroval/${receiptId}/${regInfo?.id}`,{
          newAmount:dAmount,
          new_added_months:new_added_months,
          share:Math.floor(dAmount/500),
        }) 
       if(approveData!=''){
        window.location.reload(true)

       } 
       } 

       const deletePendingPayment=async()=>{
        
       const approveData=await axios.put(`${hostVar}/membersdata/deleteunapproved/${receiptId}`) 
       if(approveData!=''){
        window.location.reload(true)

       } 
       } 

       useEffect(() => {
       // if (!effectRan.current) {
          const fetchData=async()=>{
            try {
              const fetchMember=await axios.get(`${hostVar}/membersdata/fetchmemberbyid/${id}`)
              const fetchMemberP_Payment_With_A=await axios.get(`${hostVar}/membersdata/fetchmemberpaymentbyidyes/${id}`)
              const fetchMemberP_Payment_With_P=await axios.get(`${hostVar}/membersdata/fetchmemberpaymentbyid/${id}`)

              const fetch_type_of_payment_total=await axios.get(`${hostVar}/membersdata/fetchmemberpaymenttypebyidyes/${id}`)


              setRegInfo(fetchMember.data)
              setP_Payment(fetchMemberP_Payment_With_A.data)
              setP_Payment_P(fetchMemberP_Payment_With_P.data)
              setType_of_payment_total(fetch_type_of_payment_total.data)

             
            } catch (error) {
              
            }
           
          } 
 
          fetchData()
       // }
        return () => effectRan.current = true;
 
    },[loading]);

    const sendPayment=async(e)=>{
      e.preventDefault()

      if (type_of_payment!='' && bank!='') {
        setLoading(1)
        setOpen_choose(false)


        try {
          const paymentData=await axios.post(`${hostVar}/membersdata/ppayment`,{
      id:id,
      trn:trn,
      amount:amount,
      name_of_bank:bank,
      type_of_payment:type_of_payment,
       
    })
     
    setPaymentData(paymentData.data)
    

    if (paymentData.data!='') {
        setLoading(0)

    }
        } catch (error) {
            console.log(error.message)
            console.log(paymentData)
            setLoading(0)
         }
      }if (type_of_payment=='' || bank=='') {
        setOpen_choose(true)
        setLoading(0)

      } else {
        
      }
           
                   }

            useEffect(() => {
                  
                  if (regInfo!=undefined){

                     
                     if(moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')!=NaN){
                     if(regInfo?.payed_months > moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')){
                      setMonthsDifference(regInfo?.payed_months-moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months'))

                     } if (regInfo?.payed_months < moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')) {
                      setMonthsDifference(regInfo?.payed_months-moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months'))

                     } if (regInfo?.payed_months == moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')) {
                      setMonthsDifference(moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')-regInfo?.payed_months)

                     }
                     }
                    

                  }

        }, [regInfo]);
                

    return auth=='okk'? (
        <div className='conReceipt'>
    
   

   
    
    
        <h3 className='titleOfProfile payment-page-info-list margin-top30'>Receipt Approval Page</h3>
        <h4 className='titleOfProfile' style={{color:'green'}}>{updateRes}</h4>
    <form  className='formCon regConDelete regConDeleteSinglePaymentInfo' style={{boxShadow:'0px 0px 0px'}}  >
    
    

    <div className='row listCon updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 border-none'><h4 className='font-weight500 white_space'>Id :</h4><span className='margin_left5 white_space'>{regInfo?.id}</span></div> 
     <div className='row listCon updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 border-none'><h4 className='font-weight500 white_space'>Name :</h4><span className='margin_left5 white_space'>{regInfo?.name}</span> <span className='margin_left5'>{regInfo?.father_name}</span> <span className='margin_left5 '>{regInfo?.grand_father_name}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Phone Number :</h4><span className='margin_left5 white_space'>{regInfo?.phone_number}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Amount Payed :</h4><span className='margin_left5 white_space'>{regInfo?.total_amount_payed}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Registration  :</h4><span className='margin_left5 white_space'>{type_of_payment_total?.total_registration}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Donation  :</h4><span className='margin_left5 white_space'>{type_of_payment_total?.total_donation}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>Total Monthly  :</h4><span className='margin_left5 white_space'>{type_of_payment_total?.total_monthly}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 className='font-weight500 white_space'>no of payed months  :</h4><span className='margin_left5 white_space'>{regInfo?.payed_months}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 margin-top10  border-none'><h4 className='font-weight500 white_space'>Advance/Debt  :</h4><div className='margin_left5 white_space monthsDifference' style={{color:regInfo?.payed_months < moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')?'red':'green'}}>{monthsDifference}</div></div> 






    </form>
    {/*/////////////////////*/}
    <form action="" className='formCon margin-top30 margin-bottom30 client-payment-page-form ' onSubmit={sendPayment} onClick={()=>setOpen_choose(false)}>

     <div style={{color:'red'}}>{paymentData?.response} <span style={{color:'yellow'}}>{paymentData?.registerd}</span> </div>
     <div style={{display:loading==1?'block':'none',color:'lightgray'}}>Loading....  </div>          

     <input className='row client-payment-page-form-input margin0'  type="number" onChange={(e)=>setAmount(e.target.value)} placeholder='amount'  required/>
     <input className='row client-payment-page-form-input margin0'  type="text" onChange={(e)=>setTrn(e.target.value)} placeholder='trn'  required/>

     

 <div className='row  type-of-payment-con' >
 <div className='row type-of-payment-required' style={{display:open_choose==true?'flex':'none'}}>please choose from the options below</div>

 <div>

  <div className='form-input-select-update-title'>Name of Bank</div>
   


<div className='row check-box-con form-input-select-update' onClick={()=>setBank('hijra')}>
  <div className='check-box-con-text'>HIJRA</div>
  <div className='check-box' style={{backgroundColor:bank=='hijra'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>


<div className='row check-box-con form-input-select-update' onClick={()=>setBank('awash')}>
  <div className='check-box-con-text'>Awash</div>
  <div className='check-box' style={{backgroundColor:bank=='awash'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>

<div className='row check-box-con form-input-select-update' onClick={()=>setBank('cbe')}>
  <div className='check-box-con-text'>CBE</div>
  <div className='check-box' style={{backgroundColor:bank=='cbe'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>

 
 </div>

 <div>

  <div  className='form-input-select-update-title'>Type of payment</div>

     <div className='row check-box-con form-input-select-update' onClick={()=>setType_of_payment('registration')}>
  <div className='check-box-con-text'>Registration</div>
  <div className='check-box' style={{backgroundColor:type_of_payment=='registration'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>


<div className='row check-box-con form-input-select-update' onClick={()=>setType_of_payment('monthly')}>
  <div className='check-box-con-text'>Monthly</div>
  <div className='check-box' style={{backgroundColor:type_of_payment=='monthly'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>


<div className='row check-box-con form-input-select-update' onClick={()=>setType_of_payment('donation')}>
  <div className='check-box-con-text'>Donation</div>
  <div className='check-box' style={{backgroundColor:type_of_payment=='donation'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>
 
 </div>


</div>

     <button className='row regBtn' type="submit"> Send receipt</button>


</form>

    {/*/////////////////////*/}

    <div className='numberBtnCon margin-top30 '>
                  <div className='numberBtnConBtn' onClick={()=>(setRegNumber(!regNumber))} style={{display:regNumber==true?'none':'' }}>Show List of Approved Receipts</div>
                  <div className='numberBtnConBtn' onClick={()=>(setRegNumber(!regNumber))} style={{display:regNumber==true?'':'none' }}>Show List of UnApproved Receipts</div>

                </div>

    <h3 className='titleOfProfile client-payment-page-receipts-title-text' style={{display:regNumber==true?'none':'' }}><h6>List of UnApproved Receipts</h6> <span className='membersLength'>{p_Payment_P.length}</span> </h3> 
             <h3 className='titleOfProfile client-payment-page-receipts-title-text' style={{display:regNumber==true?'':'none' }}><h6>List of Approved Receipts</h6> <span className='membersLength'>{p_Payment.length}</span> </h3> 

    
    <div >
      {p_Payment!=[0]?p_Payment?.sort((a,b)=>b.id-a.id).map((p)=>(
        <form className='formCon formConReceipt regConDelete margin-top20 receiptColor' style={{display:regNumber==true?'':'none' }}>



          <div className='regConDeleteModal' style={{display:openModal2==true && receiptId==p?.id?'block':'none'}}><div className='regConDeleteModalTitle'>Are sure you want to delete this receipt </div>
           <div className='regConDeleteModalBtnCon'>      <div className='regConDeleteModalYes' onClick={()=>(deletePayment(),setOpenModal2(false))}>Yes</div>  <div className='regConDeleteModalNo' onClick={()=>(setOpenModal2(false),setReceiptId(0))}>No</div> </div>
          </div>

          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Trn :</h4><span className='margin_left5 white_space'>{p?.trn}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Amount :</h4><span className='margin_left5 white_space'>{p?.amount}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Bank of payment :</h4><span className='margin_left5 white_space'>{p?.bank_name}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Type of payment :</h4><span className='margin_left5 white_space'>{p?.type_of_payment}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Date of entry :</h4><span className='margin_left5 white_space'>{p?.date_of_entry}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Approved :</h4><span className='margin_left5 white_space' style={{color:'green'}}>{p?.approved}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <Link to={`/singlereceipts/${regInfo?.id}/${p?.trn}`} className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space' style={{color:'blue'}}>Get full receipt ➡️</h4></Link> 


          <div className='deleteMemberCon margin-top10 margin_left10' onClick={()=>(setOpenModal2(true),setReceiptId(p?.id),setNewAmount(p?.amount),setAdded_months(p?.added_months),setType_of_payment(p?.type_of_payment))} ><div style={{color:'red'}}>Delete</div></div>

        </form>
      )):''}
    </div>


    <div >
      {p_Payment_P!=[0]?p_Payment_P?.sort((a,b)=>b.id-a.id).map((p)=>(
        <form className='formCon formConReceipt regConDelete margin-top20 receiptColor  'style={{display:regNumber==true?'none':'' }}>


          <div className='regConDeleteModal' style={{display:openModal==true && receiptId==p?.id?'block':'none'}}><div className='regConDeleteModalTitle'>Are sure you want to approve this receipt </div>
           <div className='regConDeleteModalBtnCon'>      <div className='regConDeleteModalYes' onClick={(e)=>(aprrovePayment(e),setOpenModal(false),setOpenModal2(false),setOpenModal3(false))}>Yes</div>  <div className='regConDeleteModalNo' onClick={()=>(setOpenModal(false),setReceiptId(0))}>No</div> </div>
          </div>
          <div className='regConDeleteModal' style={{display:openModal3==true && receiptId==p?.id?'block':'none'}}><div className='regConDeleteModalTitle'>Are sure you want to delete this receipt </div>
           <div className='regConDeleteModalBtnCon'>      <div className='regConDeleteModalYes' onClick={()=>(deletePendingPayment(),setOpenModal3(false))}>Yes</div>  <div className='regConDeleteModalNo' onClick={()=>(setOpenModal3(false),setReceiptId(0))}>No</div> </div>
          </div>



          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Trn :</h4><span className='margin_left5 white_space'>{p?.trn}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Amount :</h4><span className='margin_left5 white_space'>{p?.amount}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Bank of payment :</h4><span className='margin_left5 white_space'>{p?.bank_name}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div>
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Type of payment :</h4><span className='margin_left5 white_space'>{p?.type_of_payment}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div>  
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Date of entry :</h4><span className='margin_left5 white_space'>{p?.date_of_entry}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Approved :</h4><span className='margin_left5 white_space' style={{color:'red'}}>{p?.approved}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 

           <div className='deleteApproveReceiptCon'>
           <div className='deleteApproveMemberCon ' onClick={()=>(setOpenModal(true),setOpenModal2(false),setOpenModal3(false),setReceiptId(p?.id),setNewAmount(p?.amount),setType_of_payment(p?.type_of_payment))} ><div style={{color:'green'}}>Approve</div></div>
          <div className='deleteApproveMemberCon ' onClick={()=>(setOpenModal3(true),setReceiptId(p?.id))} ><div style={{color:'red'}}>Delete</div></div>

           </div>
         
        </form>
      )):''}
    </div>


    </div>
      ):<AdminLogIn/>
}

export default IndividualReceipts