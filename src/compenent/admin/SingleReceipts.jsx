import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn';
import Moment from 'react-moment';
import moment from 'moment';


function SingleReceipts() {
    const auth=JSON.parse(localStorage.getItem('auth'))


   

    const [regInfo,setRegInfo]=useState('')
    const [p_Payment,setP_Payment]=useState([0])
    const [p_Payment_P,setP_Payment_P]=useState([])
    const [added_months,setAdded_months]=useState('')
    const [monthsDifference,setMonthsDifference]=useState('') 
    const [ad_payment,setAd_payment]=useState('')
    const [d_payment,setAD_payment]=useState('')



    const [type_of_payment_total,setType_of_payment_total]=useState()
    const [updateRes,setUpdateRes]=useState('')
    const [openModal,setOpenModal]=useState(false)
    const [openModal2,setOpenModal2]=useState(false)
    const [openModal3,setOpenModal3]=useState(false)


    const [receiptId,setReceiptId]=useState('')
    const [newAmount,setNewAmount]=useState('')
    const [regNumber,setRegNumber]=useState(false)


    const {id,receipttrn}=useParams()
    const effectRan = useRef(false);



    
    const[trn,setTrn]=useState('')
    const [amount,setAmount]=useState('')
    const [bank,setBank]=useState('')
    const [type_of_payment,setType_of_payment]=useState('')
    const [loading,setLoading]=useState(0)
   
    const [paymentData,setPaymentData]=useState('');

   
   

       

       

       useEffect(() => {
       // if (!effectRan.current) {
          const fetchData=async()=>{
            try {
              const fetchMember=await axios.get(`${hostVar}/membersdata/fetchmemberbyid/${id}`)
              const fetchMemberP_Payment_With_A=await axios.get(`${hostVar}/membersdata/fetchmemberpaymentbyidyessingle/${id}/${receipttrn}`)
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

    

           

    return auth=='okk'? (
        <div className='conReceipt'>
    
   
    
    
       
    

    
    
    <div className='receiptPrintCon'>
      {p_Payment!=[0]?p_Payment?.sort((a,b)=>b.id-a.id).map((p)=>(
        <form className='formCon formConReceipt regConDelete margin-top20 receiptColor receiptPrintForm ' >

            <div className='id-card-item-logo receipt-item-logo'></div>

            <div className='receipt-item-text' >Boreaf Development And Assistant Assoc.</div>
      
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Name :</h4><span className='margin_left5 white_space'>{regInfo?.name} {regInfo?.father_name} {regInfo?.grand_father_name}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Tran No. :</h4><span className='margin_left5 white_space'>{p?.trn}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Amount :</h4><span className='margin_left5 white_space'>{p?.amount}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Bank of payment :</h4><span className='margin_left5 white_space'>{p?.bank_name}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Type of payment :</h4><span className='margin_left5 white_space'>{p?.type_of_payment}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Date of entry :</h4><span className='margin_left5 white_space'>{p?.date_of_entry}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Approved :</h4><span className='margin_left5 white_space' style={{color:'green'}}>{p?.approved}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 


        </form>
      )):''}
    </div>
 

    </div>
      ):<AdminLogIn/>
}

export default SingleReceipts