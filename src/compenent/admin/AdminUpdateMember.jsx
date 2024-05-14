import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn';



function AdminUpdateMember() {
  const auth=JSON.parse(localStorage.getItem('auth'))
  const pf=`${hostVar}/images/`

  const [file_img,setFile_img] = useState()

    const [name,setName]=useState('')
    const [fatherName,setFatherName]=useState('')
    const [grandFatherName,setGrandFatherName]=useState('')

    const [age,setAge]=useState('');
    const [work_type,setWork_type]=useState('');
    const [level_of_education,setLevel_of_education]=useState('');
    const [woreda,setWoreda]=useState('');
    const [kebele,setKebele]=useState('');
    const [residential_address,setResidential_address]=useState('');
    const [home_address,setHome_address]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('')
    const [home_cell_phone_number,setHome_cell_phone_number]=useState('');
    const [married,setMarried]=useState('');
    const [disability,setDisability]=useState('');
    const [representative,setRepresentative]=useState('');
    
    const [regInfo,setRegInfo]=useState('')
    const [updateRes,setUpdateRes]=useState('')
    const [openModal,setOpenModal]=useState(false)

    const {phone_number}=useParams()
    const effectRan = useRef(false);

   useEffect(() => {
       if (!effectRan.current) {
         const fetchData=async()=>{
           try {
             const fetchMember=await axios.get(`${hostVar}/membersdata/fetchmemberbyid/${phone_number}`)
             setRegInfo(fetchMember.data)
           } catch (error) {
             
           }
          
         } 

         fetchData()
       }
       return () => effectRan.current = true;

   },[]);

   console.log(regInfo.id)
   const [gender,setGender]=useState(regInfo.gender)


       const updateInfo=async(e)=>{
        e.preventDefault()
        try {
            const updateData=await axios.put(`${hostVar}/membersdata/updatemember`,{
                name:name?name:regInfo.name,
                fatherName:fatherName?fatherName:regInfo.father_name,
                grandFatherName:grandFatherName?grandFatherName:regInfo.grand_father_name,
                gender:gender?gender:regInfo.gender,
                age:age?age:regInfo.age,
                work_type:work_type?work_type:regInfo.work_type,
                level_of_education:level_of_education?level_of_education:regInfo.level_of_education,
                woreda:woreda?woreda:regInfo.woreda,
                kebele:kebele?kebele:regInfo.kebele,
                residential_address:residential_address?residential_address:regInfo.residential_address,
                home_address:home_address?home_address:regInfo.home_address,
                phoneNumber:phoneNumber?phoneNumber:regInfo.phone_number,
                home_cell_phone_number:home_cell_phone_number?home_cell_phone_number:regInfo.home_cell_phone_number,
                married:married?married:regInfo.married,
                disability:disability?disability:regInfo.disability,
                representative:representative?representative:regInfo.representative,
                id:regInfo.id,
                
            })
            setUpdateRes(updateData.data)
            window.location.reload(true)

        } catch (error) {
            
        }

       
       }

       const navigate=useNavigate()
       
       const deleteMember=async()=>{
        const deleteData=await axios.get(`${hostVar}/membersdata/delete/${regInfo.id}`)
        if (deleteData.data=='ok') {
          console.log(deleteData.data)
          navigate('/listofmembers')
        }
       }


       const add_img=async(e)=>{
        e.preventDefault()
    
       const formData = new FormData()
       formData.append("name",regInfo?.personal_img);
       formData.append('file', file_img)
    
       if(file_img!=undefined){
        if (file_img.size<209920) {
          try {
            const send_img=await  axios.post(`${hostVar}/membersdata/upload/${regInfo?.id}`,formData )
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
  
      
  return auth=='okk'? (
    <div className='regCon payment-page-info-list'>

      

    <h5 className='titleOfProfile payment-page-info-list margin-top20'>Update Member Profile</h5>

    <div className='add-img-con'>
<img src={pf + regInfo?.personal_img}  className='profile-img' alt="" />
<div className='add-img-input-con'>
<label htmlFor="img-input" className='add-img-text'  style={{display:file_img==undefined?'flex':'none'}}>edit img</label>
<input type="file" id='img-input' accept=".jpeg,.jpg,.png,.gif" onChange={(e) =>setFile_img(e.target.files[0])} className='img-input' required/>

<button className='add-img-btn' onClick={add_img} style={{display:file_img!=undefined?'flex':'none'}}>upload</button>
</div>

</div>

    <div className='formCon formConUpdate regConDelete deleteMemberConPayment member-links payment-page-info-list payment-page-info-list-item  ' > <Link to={`/individualreceipts/${regInfo?.id}`} className='deleteMemberConPaymentText payment-page-info-list'>Individual Payment  ➡️</Link> </div>
    <div className='formCon formConUpdate regConDelete deleteMemberConPayment member-links payment-page-info-list payment-page-info-list-item ' > <Link to={`/individualidcard/${regInfo?.id}`} className='deleteMemberConPaymentText payment-page-info-list'>Individual id-card  ➡️</Link> </div>



    <h4 className='titleOfProfile' style={{color:'yellow'}}>{updateRes}</h4>
<form  className='formCon formConUpdate regConDelete payment-page-info-list' onSubmit={updateInfo} >


 <label htmlFor="name" className='updatelabel'>Id : {regInfo?.id}</label>
 <label htmlFor="name" className='updatelabel'>Frist Name : {regInfo.name}</label>
 <input className='row listCon updatelabel payment-page-info-list' id='name' type="text" onChange={(e)=>setName(e.target.value)} placeholder='Frist Name' minlength='4' />
 <label htmlFor="Father_name" className='updatelabel'>Middle Name : {regInfo.father_name}</label>
 <input className='row listCon updatelabel payment-page-info-list' id='Father_name' type="text" onChange={(e)=>setFatherName(e.target.value)} placeholder='Middle Name' />
 <label htmlFor="Grand_father_name" className='updatelabel'>Last Name : {regInfo.grand_father_name}</label>
 <input className='row listCon updatelabel payment-page-info-list' id='Grand_father_name' type="text" onChange={(e)=>setGrandFatherName(e.target.value)} placeholder='Last Name' />
     
        <label htmlFor="name" className='updatelabel'>Age : {regInfo.age}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setAge(e.target.value)}  placeholder='Age'  />
        
        <label htmlFor="name" className='updatelabel'>Work type : {regInfo.work_type}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setWork_type(e.target.value)}  placeholder='Work type' />
        
        <label htmlFor="name" className='updatelabel'>Level of education : {regInfo.level_of_education}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setLevel_of_education(e.target.value)}  placeholder='Level of education'   />
       
        <label htmlFor="name" className='updatelabel'>Woreda: {regInfo.woreda}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setWoreda(e.target.value)}  placeholder='Woreda'  />
        
        <label htmlFor="name" className='updatelabel'>Kebele: {regInfo.kebele}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setKebele(e.target.value)}  placeholder='Kebele'   />
        
        <label htmlFor="name" className='updatelabel'>Residential address: {regInfo.residential_address}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setResidential_address(e.target.value)}  placeholder='Residential address'   />
        
        <label htmlFor="name" className='updatelabel'>Home_address: {regInfo.home_address}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setHome_address(e.target.value)}  placeholder='Home address'  />
        
        <label htmlFor="Phone_number" className='updatelabel'>Mobile phone Number : {regInfo.phone_number}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='Phone number' />
       
        <label htmlFor="name" className='updatelabel'>Home phone number: {regInfo.home_cell_phone_number}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="number" onChange={(e)=>setHome_cell_phone_number(e.target.value)}  placeholder='Home cell phone number'   />
        
        <label htmlFor="name" className='updatelabel'>Married: {regInfo.married}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setMarried(e.target.value)}  placeholder='Married'   />
        
        <label htmlFor="name" className='updatelabel'>Disability: {regInfo.disability}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setDisability(e.target.value)}  placeholder='Disability'  />
       
        <label htmlFor="name" className='updatelabel'>Representative: {regInfo.representative}</label>
        <input className='row listCon updatelabel payment-page-info-list' type="text" onChange={(e)=>setRepresentative(e.target.value)}  placeholder='Representative'   />




 <label  htmlFor="Gender" className='updatelabel'>Gender: {regInfo.gender}</label>

 <div className='row updateRow updatelabel payment-page-info-list'>
        <select className='selectUpdate '  onChange={(e) =>setGender(e.target.value)} defaultValue={regInfo.gender}   name="Gender" id="Gender">
            <option></option>
            <option value="male" >Male</option>
            <option value="female" >Female</option>


        </select>
        </div>
        <button className='row regBtn' type="submit">Update</button>
 <div className='deleteMemberCon' onClick={()=>setOpenModal(true)}>

 
  <div>Delete member</div>
  
  </div>









  <div className='regConDeleteModalPersonCon'> 
  <div className='regConDeleteModal regConDeleteModalPerson' style={{display:openModal==true?'block':'none'}}><div className='regConDeleteModalTitle'>Are sure you want to delete this member </div>
       <div className='regConDeleteModalBtnCon'>      <div className='regConDeleteModalYes' onClick={()=>(deleteMember(),setOpenModal(true))}>Yes</div>  <div className='regConDeleteModalNo' onClick={()=>setOpenModal(false)}>No</div> </div>
      </div>
     </div>
</form>
</div>
  ):<AdminLogIn/>
}

export default AdminUpdateMember