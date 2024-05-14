import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {hostVar} from '../reg/VarImportes'
import '../reg/reg.css'
import AdminLogIn from './AdminLogIn'

function PaymentHomePage() {
    const auth=JSON.parse(localStorage.getItem('auth'))

    return auth=='okk'?  (
        <div className='regCon payment-page-info-list' >
    
         
    
        <form  style={{display:auth?'':'none'}} action="" className='formCon formConIntroCon payment-page-info-list payment-page-info-list-no-border' >
         <h3 className='margin font-size20'> Payment Pages</h3>
        <Link className='formCon formConIntro payment-page-info-list' to={'/memberspaymenthistory'}>Member`s Payment</Link>
        <Link className='formCon formConIntro payment-page-info-list' to={'/paymentpendingList'}>List Of Pending Receipts</Link>
    
        
    
    
    
    
    
            
    
    
    
        </form>
        <div></div>
     </div>
    
      ):<AdminLogIn/>
}

export default PaymentHomePage