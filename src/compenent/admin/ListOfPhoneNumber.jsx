import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn'



function ListOfPhoneNumber() {
    //const regInfo=JSON.parse(localStorage.getItem('regInfo')) 
    const auth=JSON.parse(localStorage.getItem('auth'))


    const [membersInfo,setMembersInfo]=useState([])
    const [membersInfoReg,setMembersInfoReg]=useState([])
    const [info,setInfo]=useState('')
    const [searchText,setSearchText]=useState('')
    const [openModal,setOpenModal]=useState(false)
    const [deletedNumber,setDeletedNumber]=useState('')
    const [regNumber,setRegNumber]=useState(false)
    const [routerAuth,setRouterAuth]=useState(true)



    const searchByPhoneNumber=async()=>{
      try {
        const searchMembers=await axios.get(`${hostVar}/membersdata/searchphonenumber/${searchText}`)
         setMembersInfo(searchMembers.data)

      } catch (error) {
        
      }
    }

    const deleteMember=async(phone_number)=>{

      try {
        const deleteData=await axios.get(`${hostVar}/membersdata/deletephonenumber/${phone_number}`)

        if (deleteData.data=='ok') {
          setOpenModal(false)
          window.location.reload(true)
          }
      } catch (error) {
        console.log(error)
      }
     
     } 





    const [phoneNumber,setPhoneNumber]=useState('')
    const [name,setName]=useState('')


    const [regData,setRegData]=useState('')


    const addPhoneNumber=async(e)=>{
        e.preventDefault()
                try {
                      const memberData=await axios.post(`${hostVar}/membersdata/addphonenumber`,{
                
                  phoneNumber,
                  name,
  
                  
                })
                setRegData(memberData.data)
                window.location.reload(true)
  
                    } catch (error) {
                        console.log(error)
  
                     }
    }


    useEffect(()=>{
      try {
          const fetchData=async()=>{
              const ListOfMembers=await axios.get(`${hostVar}/membersdata/listofphonenumber`)
              const ListOfMembersReg=await axios.get(`${hostVar}/membersdata/listofphonenumber/reg`)

              setMembersInfo(ListOfMembers.data)
              setMembersInfoReg(ListOfMembersReg.data)

          }
         fetchData()
      } catch (error) {
          console.log(error)
      }
      
      },[])

      
  //deleteMember,addPhoneNumber
  

   

         
  return auth=='okk'? (
    <div className='regCon regConList'>

<form action="" className='formCon numberInputCon listOfMembersConSearchM listOfMembersConSearchMInOne listOfMembersConAdd' onSubmit={addPhoneNumber}>

<input className='row listCon numberInput' type="number" onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='Add Phone Number'  required/>
<input className='row listCon numberInput' type="text" onChange={(e)=>setName(e.target.value)} placeholder='Add Name'  />

<button className='searchByBtn margin' type='submit'>add</button>

</form>
<h3 className='margin5' style={{color:regData=='Duplicated entry'?'red':'green'}}>{regData}</h3>


       

    <div className='formCon  numberInputCon listOfMembersConSearchM listOfMembersConSearch'>
             <input className='row listCon numberInput ' type="text" placeholder='search ' onChange={(e)=>setSearchText(e.target.value)} />
            <div className="searchByCon searchByConNumber margin" style={{marginBottom:'12px'}} > <div className='searchByBtn' onClick={searchByPhoneNumber}>Search</div></div>
             </div>

             <div className='numberBtnCon'>
                  <div className='numberBtnConBtn' onClick={()=>(setRegNumber(!regNumber))} style={{display:regNumber==true?'none':'' }}>Show Registerd numbers</div>
                  <div className='numberBtnConBtn' onClick={()=>(setRegNumber(!regNumber))} style={{display:regNumber==true?'':'none' }}>Show UnRegisterd numbers</div>

                </div>

             <h3 className='titleOfProfile' style={{display:regNumber==true?'none':'' }}><h6>List of unregisterd numbers</h6> <span className='membersLength'>{membersInfo.length}</span> </h3> 
             <h3 className='titleOfProfile' style={{display:regNumber==true?'':'none' }}><h6>List of registerd numbers</h6> <span className='membersLength'>{membersInfoReg.length}</span> </h3> 

              
    {membersInfoReg?.map((m,index)=>(
      

  <>
<div  className='formCon listOfMembersCon' style={{display:regNumber==true?'':'none' }} key={m?.id}>



<div className='regConDeleteModal' style={{display:openModal==true?'block':'none'}}><div className='regConDeleteModalTitle'>Are sure you want to delete this phone number </div>
<div className='regConDeleteModalBtnCon'>      <div className='regConDeleteModalYes' onClick={()=>(deleteMember(deletedNumber),setOpenModal(false))}>Yes</div>  <div className='regConDeleteModalNo' onClick={()=>setOpenModal(false)}>No</div> </div>
</div>

 <div className='row listCon deleteOnActive' key={m?.id} style={{display:m.reg=='yes'?'':'none'}}><span className='spanOfList'><div className='margin_right10' style={{color:'#1aadca'}}>{index+1}</div>{m?.phone_number}<div className='margin_left10 white_space' style={{color:'green'}}>{m?.name}</div></span>  <div><div className="deleteClick" style={{color:m.reg=='yes'?'green':'none'}} onClick={()=>(
  setDeletedNumber(m?.phone_number),setOpenModal(true)
 )}>Delete</div></div>  </div>    
  
  

</div>






</>
))}



{membersInfo?.map((m,index)=>(
      

      <>
    
    
    <div  className='formCon listOfMembersCon' style={{display:regNumber==true?'none':'' }} key={m?.id}>
    
    
    
    <div className='regConDeleteModal' style={{display:openModal==true?'block':'none'}}><div className='regConDeleteModalTitle'>Are sure you want to delete this phone number </div>
    <div className='regConDeleteModalBtnCon'>      <div className='regConDeleteModalYes' onClick={()=>(deleteMember(deletedNumber),setOpenModal(false))}>Yes</div>  <div className='regConDeleteModalNo' onClick={()=>setOpenModal(false)}>No</div> </div>
    </div>
        
      
      <div className='row listCon deleteOnActive' key={m?.id} style={{display:m.reg==''?'':'none'}}><span className='spanOfList'><div className='margin_right10' style={{color:'#1aadca'}}>{index+1}</div>{m?.phone_number}<div className='margin_left10 white_space' style={{color:'red'}}>{m?.name}</div></span>  <div><div className="deleteClick" style={{color:m.reg=='yes'?'green':'none'}} onClick={()=>(
      setDeletedNumber(m?.phone_number),setOpenModal(true)
     )}>Delete</div></div>  </div>
    
    </div>
    
    
    
    </>
    ))}

</div>   
  ):<AdminLogIn/>
}

export default ListOfPhoneNumber