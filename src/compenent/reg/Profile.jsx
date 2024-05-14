import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import {hostVar} from './VarImportes'
import './reg.css'



function Profile() {

    
    
    const [regInfo,setRegInfo]=useState('')
    const [language,setLanguage]=useState(JSON.parse(localStorage.getItem('language'))?JSON.parse(localStorage.getItem('language')):'1')

   
    const [wait,setWait]=useState(0)
   
    const [file_img,setFile_img] = useState()


    const {id}=useParams()
    const effectRan = useRef(false);

    const pf=`${hostVar}/images/`


 /*  useEffect(() => {
       if (!effectRan.current) {
         const fetchData=async()=>{
           try {
             const fetchMember=await axios.get(`${hostVar}/membersdata/fetchmemberbyid/${id}`)
             setRegInfo(fetchMember.data)
           } catch (error) {
             
           }
          
         } 

         fetchData()
       }
       return () => effectRan.current = true;

   },[wait]);
    */


   console.log(regInfo)
   const [gender,setGender]=useState(regInfo.gender)

   const add_img=async(e)=>{
    e.preventDefault()

   const formData = new FormData()
   formData.append("name",regInfo?.personal_img);
   formData.append('file', file_img)

   if(file_img!=undefined){
    if (file_img.size<209920) {
      try {
        const send_img=await  axios.post(`${hostVar}/membersdata/upload/${id}`,formData )
      const d_img=send_img.data
       if (d_img.success=='course created') {
        setFile_img(undefined)
        window.location.reload(true)

       

       }
      } catch (error) {
        
      }
     }if (file_img.size >= 209920) {
      alert('image size limit exceeded 200kb')
  
    }
   }
}
       


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
//<div style={{display:language=='1'?'flex':'none'}}>First Name</div> <div style={{display:language=='2'?'flex':'none'}}>maqaa kee</div> <div style={{display:language=='3'?'flex':'none'}}>የአንተ ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسمك</div><div className='margin_left5'>:</div>      
  return (
    <div className='regCon profile-page-con payment-page-info-list'>

      



<form  className='formCon formConUpdate regConDelete profile-page-form-con payment-page-info-list '  >
<h3 className='titleOfProfile margin-top20 profile-page-title-text payment-page-info-list '>Your Profile</h3>

<div className='add-img-con '>
<img src={pf + regInfo?.personal_img}  className='profile-img' alt="" />
<div className='add-img-input-con'>
<label htmlFor="img-input" className='add-img-text'  style={{display:file_img==undefined?'flex':'none'}}>edit img</label>
<input type="file" id='img-input' accept=".jpeg,.jpg,.png,.gif" onChange={(e) =>setFile_img(e.target.files[0])} className='img-input' required/>

<button className='add-img-btn' onClick={add_img} style={{display:file_img!=undefined?'flex':'none'}}>upload</button>
</div>

</div>



 <label htmlFor="name" className='updatelabel payment-page-info-list   margin-top5' ><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}> <div style={{display:language=='1'?'flex':'none'}}>Id no</div> <div style={{display:language=='2'?'flex':'none'}}>Lakkoofsa Eenyummaa</div> <div style={{display:language=='3'?'flex':'none'}}>መለያ ቁጥር</div> <div style={{display:language=='4'?'flex':'none'}}>رقم التعريف</div><div className='margin_left5'>:</div> </div>{regInfo?.id}</label>
 
       <label htmlFor="name" className='updatelabel    margin-top5' ><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>First Name</div> <div style={{display:language=='2'?'flex':'none'}}>Maqaa Kee</div> <div style={{display:language=='3'?'flex':'none'}}>ያእርሶ ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسمك</div><div className='margin_left5'>:</div> </div>{regInfo.name}</label>
       <label htmlFor="Father_name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Middle Name</div> <div style={{display:language=='2'?'flex':'none'}}>Maqaa Abbaa</div> <div style={{display:language=='3'?'flex':'none'}}>የአባት ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسم الأب</div><div className='margin_left5'>:</div></div>{regInfo.father_name}</label>
       <label htmlFor="Grand_father_name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Last Name</div> <div style={{display:language=='2'?'flex':'none'}}>Maqaa Abbaa Guddaa</div> <div style={{display:language=='3'?'flex':'none'}}>የአያት ስም</div> <div style={{display:language=='4'?'flex':'none'}}>اسم  الجد</div><div className='margin_left5'>:</div> </div>{regInfo.grand_father_name}</label>
        <label htmlFor="name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Age</div> <div style={{display:language=='2'?'flex':'none'}}>Umrii</div> <div style={{display:language=='3'?'flex':'none'}}>ዕድሜ</div> <div style={{display:language=='4'?'flex':'none'}}>عمر</div><div className='margin_left5'>:</div> </div>{regInfo.age}</label>
        <label htmlFor="name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Work type</div> <div style={{display:language=='2'?'flex':'none'}}>Gosa Hojii</div> <div style={{display:language=='3'?'flex':'none'}}>የሥራ ዓይነት</div> <div style={{display:language=='4'?'flex':'none'}}>نوع العمل</div><div className='margin_left5'>:</div> </div>{regInfo.work_type}</label>
        <label htmlFor="name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}> <div style={{display:language=='1'?'flex':'none'}}>Level of education</div> <div style={{display:language=='2'?'flex':'none'}}>Sadarkaa barnootaa</div> <div style={{display:language=='3'?'flex':'none'}}>የትምህርት ደረጃ</div> <div style={{display:language=='4'?'flex':'none'}}>مستوى التعليم</div><div className='margin_left5'>:</div> </div>{regInfo.level_of_education}</label>
        <label htmlFor="name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}> <div style={{display:language=='1'?'flex':'none'}}>Woreda</div> <div style={{display:language=='2'?'flex':'none'}}>Aanaa</div> <div style={{display:language=='3'?'flex':'none'}}>ወረዳ</div> <div style={{display:language=='4'?'flex':'none'}}>اسمك</div><div className='margin_left5'>:</div> </div>{regInfo.woreda}</label>
        <label htmlFor="name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Qablee</div> <div style={{display:language=='2'?'flex':'none'}}>Qablee</div> <div style={{display:language=='3'?'flex':'none'}}>ቀበሌ</div> <div style={{display:language=='4'?'flex':'none'}}>حي</div><div className='margin_left5'>:</div> </div>{regInfo.kebele}</label>
        <label htmlFor="name" className='updatelabel   margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Residential address</div> <div style={{display:language=='2'?'flex':'none'}}>Teessoo Mana Jireenyaa</div> <div style={{display:language=='3'?'flex':'none'}}>የመኖሪያ ቤት አድራሻ</div> <div style={{display:language=='4'?'flex':'none'}}>عنوان السكن</div><div className='margin_left5'>:</div></div>{regInfo.residential_address}</label>
        <label htmlFor="name" className='updatelabel   margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Home address</div> <div style={{display:language=='2'?'flex':'none'}}>Teessoo manaa</div> <div style={{display:language=='3'?'flex':'none'}}>የቤት አድራሻ</div> <div style={{display:language=='4'?'flex':'none'}}>عنوان المنزل</div><div className='margin_left5'>:</div>  </div>{regInfo.home_address}</label>
        <label htmlFor="Phone_number" className='updatelabel   margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Phone Number 1</div> <div style={{display:language=='2'?'flex':'none'}}>Lakkoofsa Bilbilaa 1</div> <div style={{display:language=='3'?'flex':'none'}}>ስልክ ቁጥር 1</div> <div style={{display:language=='4'?'flex':'none'}}>رقم التليفون 1</div><div className='margin_left5'>:</div>  </div>{regInfo.phone_number}</label>
        <label htmlFor="name" className='updatelabel   margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Phone Number 2</div> <div style={{display:language=='2'?'flex':'none'}}>Lakkoofsa Bilbilaa 2</div> <div style={{display:language=='3'?'flex':'none'}}>ስልክ ቁጥር 2</div> <div style={{display:language=='4'?'flex':'none'}}>رقم التليفون 2</div><div className='margin_left5'>:</div></div>{regInfo.home_cell_phone_number}</label>
        <label htmlFor="name" className='updatelabel   margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Married</div> <div style={{display:language=='2'?'flex':'none'}}>Kan Fuudhe</div> <div style={{display:language=='3'?'flex':'none'}}>ያገባ</div> <div style={{display:language=='4'?'flex':'none'}}>متزوج</div><div className='margin_left5'>:</div>  </div>{regInfo.married}</label>
        <label htmlFor="name" className='updatelabel   margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Disability</div> <div style={{display:language=='2'?'flex':'none'}}>Qaama miidhaamaa</div> <div style={{display:language=='3'?'flex':'none'}}>አካል ጉዳተኝነት</div> <div style={{display:language=='4'?'flex':'none'}}>عجز</div><div className='margin_left5'>:</div> </div>{regInfo.disability}</label>
        <label htmlFor="name" className='updatelabel    margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Representative</div> <div style={{display:language=='2'?'flex':'none'}}>Bakka bu'aa</div> <div style={{display:language=='3'?'flex':'none'}}>ተወካይ</div> <div style={{display:language=='4'?'flex':'none'}}>ممثل</div><div className='margin_left5'>:</div>  </div>{regInfo.representative}</label>
        <label htmlFor="name" className='updatelabel   margin-top5'><div className='updatelabeltext payment-page-info-list' style={{display:'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Gender</div> <div style={{display:language=='2'?'flex':'none'}}>Koorniyaa</div> <div style={{display:language=='3'?'flex':'none'}}>ጾታ</div> <div style={{display:language=='4'?'flex':'none'}}>جنس</div><div className='margin_left5'>:</div>  </div>{regInfo.gender}</label>

</form>


</div>
  )
}

export default Profile