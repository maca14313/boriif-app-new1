import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../reg/homepage.css'
import {hostVar} from '../reg/VarImportes'
import AdminLogIn from './AdminLogIn'

function AdminHomePage() {
  const auth=JSON.parse(localStorage.getItem('auth'))

  const regInfo=JSON.parse(localStorage.getItem('regInfo')) 
  const [openModal,setOpenModal]=useState(0)

  const logOut=()=>{
    localStorage.removeItem('auth')
    window.location.reload(true)
  }
  return auth=='okk'? (
    <div className='homeCon'>
        <div className='welcomPage'>

        

         <div className='navCon' >

        

          <div className="navLogo">Admin Home Page
          
          <div className='navConOpener' onClick={()=>setOpenModal(1)}>
            <div className='navConOpenerLine'></div>
            <div className='navConOpenerLine'></div>
            <div className='navConOpenerLine'></div>
          </div> 
          
          </div>

          <div className="navLinksConMiddle">
           
            <Link onClick={()=>(window.location.reload(true))}  className="navLinksConMiddleItem">Home</Link>
            <Link to={'/adminregistration'} className="navLinksConMiddleItem" >Registretion</Link>
            <Link to={'/listofmembers'} className="navLinksConMiddleItem" >Members</Link>
            <Link to={'/paymenthomepage'} className="navLinksConMiddleItem" >Payment</Link>
            <Link to={''}  onClick={logOut}  className='navLinksConMiddleItem navLinkM'>Log Out</Link>

            
            
           
          </div>

       {  /* <div className="navLinksCon">
          <Link to={'/memberprofile'} style={{display:regInfo==undefined?'none':'block'}}  className='navLink'>You</Link>
          <Link to={''} style={{display:regInfo==undefined?'none':'block'}} onClick={logOut}  className='navLink'>Log Out</Link>
          <Link to={'/loginmember'} style={{display:regInfo!=undefined?'none':'block'}} className='navLink'>Log In</Link>
          <Link to={'/registretion'} style={{display:regInfo!=undefined?'none':'block'}}  className='navLink'>Sign Up</Link>
  </div> */}

         </div>


         <div className='navConM' style={{display:openModal==1?'block':'none'}} >
                
                <div className='navConMCloser' onClick={()=>setOpenModal(0)}>
                  X
                </div>

<div className="navLinksConMiddleM">
 
  <Link onClick={()=>(window.location.reload(true))}  className="navLinksConMiddleItemM" style={{color:'black'}}>Home</Link>
  <Link to={'/adminregistration'} className="navLinksConMiddleItemM" style={{color:'black'}}>Registretion</Link>
  <Link to={'/listofmembers'}><div className="navLinksConMiddleItemM" style={{color:'black'}}>Members</div></Link>
  <Link to={'/paymenthomepage'}><div className="navLinksConMiddleItemM" style={{color:'black'}}>Payment</div></Link>
  <Link to={''}  onClick={logOut}  className='navLinksConMiddleItem navLinkM'>Log Out</Link>


  
 

  

 
</div>
</div>




<div className='introCon'>
        

        <div className='introConIntro'>
         <div className='introConIntroText introConIntroTextTitle'>Boreaf Development And Assistant Assoc.
           </div>
           <div className='introConIntroText'>Coming together is a beginning; keeping together is progress; working together is success.
           </div>
        </div>

        <div className='introConImgCon'>
        <div className='introConImgConText introConImgConImg'></div>
      </div>

      </div>

      
         
         

        </div>
    </div>
  ):<AdminLogIn/>
}

export default AdminHomePage