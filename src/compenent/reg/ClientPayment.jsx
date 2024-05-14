import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import {hostVar} from './VarImportes'
import './reg.css'
import Moment from 'react-moment';
import moment from 'moment';
function ClientPayment() {


    const regInfoM=JSON.parse(localStorage.getItem('regInfo')) 
    const [language,setLanguage]=useState(JSON.parse(localStorage.getItem('language'))?JSON.parse(localStorage.getItem('language')):'1')

    
   
    const [regInfo,setRegInfo]=useState([])

    const [p_Payment,setP_Payment]=useState([0])
    const [p_Payment_P,setP_Payment_P]=useState([])
    const [type_of_payment_total,setType_of_payment_total]=useState()
    const [monthsDifference,setMonthsDifference]=useState('') 
    const [updateRes,setUpdateRes]=useState('')
    const [open_choose,setOpen_choose]=useState(false)
    const [openModal,setOpenModal]=useState(false)
    const [openModal2,setOpenModal2]=useState(false)
    const [openModal3,setOpenModal3]=useState(false)


    const [receiptId,setReceiptId]=useState('')
    const [newAmount,setNewAmount]=useState('')
    const [regNumber,setRegNumber]=useState(false)


    const id=regInfoM.id
    const effectRan = useRef(false);



    
    const[trn,setTrn]=useState('')
    const [amount,setAmount]=useState('')
    const [bank,setBank]=useState('')
    const [type_of_payment,setType_of_payment]=useState('')
    const [loading,setLoading]=useState(0)
   
    const [paymentData,setPaymentData]=useState('');

   
   

       

       const navigate=useNavigate()
       
     

      

    

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
      setLoading(1)
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


//<div style={{display:language=='1'?'flex':'none'}}>Name</div> <div style={{display:language=='2'?'flex':'none'}}>Maqaa</div> <div style={{display:language=='3'?'flex':'none'}}>ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسم</div>

    return (
        <div className='conReceipt client-payment-page-con'>
    
          

   

    <h3 className='titleOfProfile payment-page-info-list margin-top30'> <div style={{display:language=='1'?'flex':'none'}}>Payment Page</div> <div style={{display:language=='2'?'flex':'none'}}>Fula Kaffaltii</div> <div style={{display:language=='3'?'flex':'none'}}>የክፍያ ገጽ</div> <div style={{display:language=='4'?'flex':'none'}}>صفحة الدفع</div> </h3>
        <h4 className='titleOfProfile' style={{color:'green'}}>{updateRes}</h4>

    <form  className='formCon regConDelete client-payment-page-info regConDeleteSinglePaymentInfo ' style={{boxShadow:'0px 0px 0px',display:language=='4'?'none':'flex'}}  >

   
     <div className='row listCon updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Id no</div> <div style={{display:language=='2'?'flex':'none'}}>Lakkoofsa Eenyummaa</div> <div style={{display:language=='3'?'flex':'none'}}>መለያ ቁጥር</div> <div style={{display:language=='4'?'flex':'none'}}>رقم التعريف</div><div className='margin_left5'>:</div> </h4> <span className='margin_left5 white_space'>{regInfo?.id}</span></div> 
     <div className='row listCon updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Name</div> <div style={{display:language=='2'?'flex':'none'}}>Maqaa</div> <div style={{display:language=='3'?'flex':'none'}}>ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسم</div><div className='margin_left5'>:</div></h4><span className='margin_left5 white_space'>{regInfo.name}</span> <span className='margin_left5'>{regInfo.father_name}</span> <span className='margin_left5 '>{regInfo.grand_father_name}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Phone Number</div>  <div style={{display:language=='2'?'flex':'none'}}>Lakkoofsa Bilbilaa</div> <div style={{display:language=='3'?'flex':'none'}}>የስልክ ቁጥር</div> <div style={{display:language=='4'?'flex':'none'}}>رقم التليفون</div><div className='margin_left5'>:</div></h4><span className='margin_left5 white_space'>{regInfo.phone_number}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total Amount Payed</div> <div style={{display:language=='2'?'flex':'none'}}>Waliigala Kaffalti Raawwatame</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ የተከፈለ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>إجمالي المبلغ المدفوع</div><div className='margin_left5'>:</div></h4><span className='margin_left5 white_space'>{regInfo.total_amount_payed}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total From Registration</div> <div style={{display:language=='2'?'flex':'none'}}>waliigala Kaffalti Galme</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ የምዝግባ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>المجموع من التسجيل</div><div className='margin_left5'>:</div></h4><span className='margin_left5 white_space'>{type_of_payment_total?.total_registration}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total Donation</div> <div style={{display:language=='2'?'flex':'none'}}>waliigala Kaffalti Arjoomaa</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ የልገሳ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>المجموع من التبرع</div><div className='margin_left5'>:</div></h4><span className='margin_left5 white_space'>{type_of_payment_total?.total_donation}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total Monthly</div> <div style={{display:language=='2'?'flex':'none'}}>Waliigala Kaffalti ji`aa</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ ወርሃዊ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>المجموع الشهري</div><div className='margin_left5'>:</div></h4><span className='margin_left5 white_space'>{type_of_payment_total?.total_monthly}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>No of payed months</div> <div style={{display:language=='2'?'flex':'none'}}>baay’ina ji`oota kaffalaman </div> <div style={{display:language=='3'?'flex':'none'}}>የተከፈለባቸው ወራት ብዛት</div> <div style={{display:language=='4'?'flex':'none'}}>عدد الأشهر المدفوعة</div><div className='margin_left5'>:</div></h4><span className='margin_left5 white_space'>{regInfo?.payed_months}</span></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 margin-top10  border-none'><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Advance/Debt</div> <div style={{display:language=='2'?'flex':'none'}}>Dursa/kan Boodtti Hafee</div> <div style={{display:language=='3'?'flex':'none'}}>የቅድሚያ/ዕዳ</div> <div style={{display:language=='4'?'flex':'none'}}>سلفة / ديون</div><div className='margin_left5'>:</div></h4><div className='margin_left5 white_space monthsDifference' style={{color:regInfo?.payed_months < moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')?'red':'green'}}>{monthsDifference}</div></div> 


    
    </form>

    <form  className='formCon regConDelete client-payment-page-info regConDeleteSinglePaymentInfo ' style={{boxShadow:'0px 0px 0px',display:language=='4'?'flex':'none'}}  >

   
     <div className='row listCon updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 border-none'><span className='margin_left5 white_space'>{regInfo?.id}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Id no</div> <div style={{display:language=='2'?'flex':'none'}}>Lakkoofsa Eenyummaa</div> <div style={{display:language=='3'?'flex':'none'}}>መለያ ቁጥር</div> <div style={{display:language=='4'?'flex':'none'}}>رقم التعريف</div> </h4></div> 
     <div className='row listCon updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 border-none'><span className='margin_left5 white_space'>{regInfo.name}</span> <span className='margin_left5'>{regInfo.father_name}</span> <span className='margin_left5 '>{regInfo.grand_father_name}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Name</div> <div style={{display:language=='2'?'flex':'none'}}>Maqaa</div> <div style={{display:language=='3'?'flex':'none'}}>ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسم</div></h4></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><span className='margin_left5 white_space'>{regInfo.phone_number}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Phone Number</div>  <div style={{display:language=='2'?'flex':'none'}}>Lakkoofsa Bilbilaa</div> <div style={{display:language=='3'?'flex':'none'}}>የስልክ ቁጥር</div> <div style={{display:language=='4'?'flex':'none'}}>رقم التليفون</div></h4></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><span className='margin_left5 white_space'>{regInfo.total_amount_payed}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total Amount Payed</div> <div style={{display:language=='2'?'flex':'none'}}>Waliigala Kaffalti Raawwatame</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ የተከፈለ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>إجمالي المبلغ المدفوع</div></h4></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><span className='margin_left5 white_space'>{type_of_payment_total?.total_registration}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total From Registration</div> <div style={{display:language=='2'?'flex':'none'}}>waliigala Kaffalti Galme</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ የምዝግባ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>المجموع من التسجيل</div></h4></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><span className='margin_left5 white_space'>{type_of_payment_total?.total_donation}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total Donation</div> <div style={{display:language=='2'?'flex':'none'}}>waliigala Kaffalti Kennaa</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ የስጦታ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>المجموع من التبرع</div></h4></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><span className='margin_left5 white_space'>{type_of_payment_total?.total_monthly}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Total Monthly</div> <div style={{display:language=='2'?'flex':'none'}}>Waliigala Kaffalti ji`aa</div> <div style={{display:language=='3'?'flex':'none'}}>አጠቃላይ ወርሃዊ ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>المجموع الشهري</div></h4></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0  border-none'><span className='margin_left5 white_space'>{regInfo?.payed_months}</span><div className='margin_left5'>:</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>No of payed months</div> <div style={{display:language=='2'?'flex':'none'}}>baay’ina ji`oota kaffalaman </div> <div style={{display:language=='3'?'flex':'none'}}>የተከፈለባቸው ወራት ብዛት</div> <div style={{display:language=='4'?'flex':'none'}}>عدد الأشهر المدفوعة</div></h4></div> 
     <div className='row listCon  updatelabel updatelabelReceipt payment-page-info-list font-size14 margin-bottom0 margin-top10  border-none'><div className='margin_left5 white_space monthsDifference' style={{color:regInfo?.payed_months < moment(new Date()).diff(moment(`'${regInfo?.register_date}'`),'months')?'red':'green'}}>{monthsDifference}</div><h4 style={{display:'flex'}} className='font-weight500 white_space'><div style={{display:language=='1'?'flex':'none'}}>Advance/Debt</div><div className='margin_left10'>:</div> <div style={{display:language=='2'?'flex':'none'}}>Dursa/kan Boodtti Hafee</div> <div style={{display:language=='3'?'flex':'none'}}>የቅድሚያ/ዕዳ</div> <div style={{display:language=='4'?'flex':'none'}}>سلفة / ديون</div></h4></div> 


    
    </form>
    {/*/////////////////////*/}
    <form action="" className='formCon margin-top30 margin-bottom30 client-payment-page-form' onSubmit={sendPayment}>

     <div style={{color:'red'}}>{paymentData?.response} <span style={{color:'yellow'}}>{paymentData?.registerd}</span> </div>
     <div style={{display:loading==1?'block':'none',color:'lightgray'}}><div style={{display:language=='1'?'flex':'none'}}>Loading...</div> <div style={{display:language=='2'?'flex':'none'}}>fe’aa jiraa...</div> <div style={{display:language=='3'?'flex':'none'}}>በመጫን ላይ...</div> <div style={{display:language=='4'?'flex':'none'}}>تحميل...</div>  </div>          

     <input className='row client-payment-page-form-input margin0'  type="number" onChange={(e)=>setAmount(e.target.value)} placeholder={language=='1'?'amount':language=='2'?'hanga':language=='3'?'መጠን':language=='4'?'كمية':''}  required/>
     <input className='row client-payment-page-form-input margin0'  type="text" onChange={(e)=>setTrn(e.target.value)} placeholder={language=='1'?'transaction number':language=='2'?'Lakkoofsa Jijjiirraa':language=='3'?'የዝውውር ቁጥር':language=='4'?'رقم التحويلة':''}  required/>

     <div className='row  type-of-payment-con'>
     <div className='row type-of-payment-required' style={{display:open_choose==true?'flex':'none'}}>please choose from the options below</div>

<div>

 <div className='form-input-select-update-title'><div style={{display:language=='1'?'flex':'none'}}>Name of Bank</div> <div style={{display:language=='2'?'flex':'none'}}>Maqaa Baankii</div> <div style={{display:language=='3'?'flex':'none'}}>የባንክ ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسم البنك</div></div>

   


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

 <div  className='form-input-select-update-title'><div style={{display:language=='1'?'flex':'none'}}>Type of payment</div> <div style={{display:language=='2'?'flex':'none'}}>Gosa kaffaltii</div> <div style={{display:language=='3'?'flex':'none'}}>የክፍያ ዓይነት</div> <div style={{display:language=='4'?'flex':'none'}}>نوع الدفع</div></div>

    <div className='row check-box-con form-input-select-update' onClick={()=>setType_of_payment('registration')}>
 <div className='check-box-con-text'><div style={{display:language=='1'?'flex':'none'}}>Registration</div> <div style={{display:language=='2'?'flex':'none'}}>Galmee</div> <div style={{display:language=='3'?'flex':'none'}}>ምዝገባ</div> <div style={{display:language=='4'?'flex':'none'}}>تسجيل</div></div>
 <div className='check-box' style={{backgroundColor:type_of_payment=='registration'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>


<div className='row check-box-con form-input-select-update' onClick={()=>setType_of_payment('monthly')}>
 <div className='check-box-con-text'><div style={{display:language=='1'?'flex':'none'}}>Monthly</div> <div style={{display:language=='2'?'flex':'none'}}>Ji'a</div> <div style={{display:language=='3'?'flex':'none'}}>ወርሃዊ</div> <div style={{display:language=='4'?'flex':'none'}}>شهريا</div></div>
 <div className='check-box' style={{backgroundColor:type_of_payment=='monthly'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>


<div className='row check-box-con form-input-select-update' onClick={()=>setType_of_payment('donation')}>
 <div className='check-box-con-text'><div style={{display:language=='1'?'flex':'none'}}>Donation</div> <div style={{display:language=='2'?'flex':'none'}}>Arjooma</div> <div style={{display:language=='3'?'flex':'none'}}>ልገሳ</div> <div style={{display:language=='4'?'flex':'none'}}>التبرع</div></div>
 <div className='check-box' style={{backgroundColor:type_of_payment=='donation'?'yellow':'rgb(237, 237, 237)'}}></div>
</div>

</div>


</div>    

     <button className='row regBtn receipt-btn' type="submit"><div style={{display:language=='1'?'flex':'none'}}>Send</div> <div style={{display:language=='2'?'flex':'none'}}>Ergu</div> <div style={{display:language=='3'?'flex':'none'}}>መላክ</div> <div style={{display:language=='4'?'flex':'none'}}>إرسال</div></button>


</form>

    {/*/////////////////////*/}

    <div className='numberBtnCon margin-top30 '>
                  <div className='titleOfProfile client-payment-page-receipts-title-text' onClick={()=>(setRegNumber(!regNumber))} style={{display:regNumber==true?'none':'' }}><div style={{display:language=='1'?'flex':'none'}}>Approved Receipts</div> <div style={{display:language=='2'?'flex':'none'}}>Nagahee Raggaasifame</div> <div style={{display:language=='3'?'flex':'none'}}>ተቀባይነት ያገኙ ደረሰኞች</div> <div style={{display:language=='4'?'flex':'none'}}>الإيصالات المعتمدة</div><span className='margin_left10'>➡️</span></div>
                  <div className='titleOfProfile client-payment-page-receipts-title-text' onClick={()=>(setRegNumber(!regNumber))} style={{display:regNumber==true?'':'none'}}><div style={{display:language=='1'?'flex':'none'}}>Un Approved Receipts</div> <div style={{display:language=='2'?'flex':'none'}}>Nagahee Kan Hin Raggaasifame</div> <div style={{display:language=='3'?'flex':'none'}}>ተቀባይነት ያላገኙ ደረሰኞች</div> <div style={{display:language=='4'?'flex':'none'}}>الإيصالات غير معتمد</div> <span className='margin_left10'>➡️</span></div>

                </div>

                <h3 className='titleOfProfile client-payment-page-receipts-title-text' style={{display:regNumber==true?'none':'',color:'yellow' }}><h6><div style={{display:language=='1'?'flex':'none'}}>Un Approved Receipts</div> <div style={{display:language=='2'?'flex':'none'}}>Nagahee Kan Hin Raggaasifame</div> <div style={{display:language=='3'?'flex':'none'}}>ተቀባይነት ያላገኙ ደረሰኞች</div> <div style={{display:language=='4'?'flex':'none'}}>الإيصالات غير معتمد</div></h6> <span className='membersLength'>{p_Payment_P.length}</span> </h3> 
             <h3 className='titleOfProfile client-payment-page-receipts-title-text' style={{display:regNumber==true?'':'none',color:'lightgreen' }}><h6><div style={{display:language=='1'?'flex':'none'}}>Approved Receipts</div> <div style={{display:language=='2'?'flex':'none'}}>Nagahee Raggaasifame</div> <div style={{display:language=='3'?'flex':'none'}}>ተቀባይነት ያገኙ ደረሰኞች</div> <div style={{display:language=='4'?'flex':'none'}}>الإيصالات المعتمدة</div></h6> <span className='membersLength'>{p_Payment.length}</span> </h3> 

    
    <div >
      {p_Payment!=[0]?p_Payment?.sort((a,b)=>b.id-a.id).map((p)=>(
        <form className='formCon formConReceipt regConDelete margin-top20 receiptColor' style={{display:regNumber==true?'':'none' }}>

          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Trn :</h4><span className='margin_left5 white_space'>{p?.trn}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Amount :</h4><span className='margin_left5 white_space'>{p?.amount}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Bank of payment :</h4><span className='margin_left5 white_space'>{p?.bank_name}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Type of payment :</h4><span className='margin_left5 white_space'>{p?.type_of_payment}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div>  
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Date of entry :</h4><span className='margin_left5 white_space'>{p?.date_of_entry}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Approved :</h4><span className='margin_left5 white_space' style={{color:'green'}}>{p?.approved}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 

        </form>
      )):''}
    </div>


    <div >
      {p_Payment_P!=[0]?p_Payment_P?.sort((a,b)=>b.id-a.id).map((p)=>(
        <form className='formCon formConReceipt regConDelete margin-top20 receiptColor  'style={{display:regNumber==true?'none':'' }}>

          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Trn :</h4><span className='margin_left5 white_space'>{p?.trn}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Amount :</h4><span className='margin_left5 white_space'>{p?.amount}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Bank of payment :</h4><span className='margin_left5 white_space'>{p?.bank_name}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Type of payment :</h4><span className='margin_left5 white_space'>{p?.type_of_payment}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div>  
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Date of entry :</h4><span className='margin_left5 white_space'>{p?.date_of_entry}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 
          <div className='row listCon updatelabel updatelabelReceipt font-size16 margin-bottom0 receiptColorItem '><h4 className='font-weight500 white_space'>Approved :</h4><span className='margin_left5 white_space' style={{color:'red'}}>{p?.approved}</span> <span className='margin_left5'>{}</span> <span className='margin_left5 '>{}</span></div> 

           <div className='deleteApproveReceiptCon'>

           </div>
         
        </form>
      )):''}
    </div>


    </div>
      )
}

export default ClientPayment