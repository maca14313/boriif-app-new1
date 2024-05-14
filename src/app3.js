import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Counter } from './features/counter/Counter';
import PhoneNumberList from './compenent/admin/PhoneNumberList';
import ListOfMembers from './compenent/admin/ListOfMembers';
import ListOfPhoneNumber from './compenent/admin/ListOfPhoneNumber';
import AdminUpdateMember from './compenent/admin/AdminUpdateMember';
import AdminLogIn from 'compenent/admin/AdminLogIn';
import PaymentPendingList from 'compenent/admin/PaymentPendingList';
import ReceiptApproval from 'compenent/admin/ReceiptApproval';
import PaymentHomePage from 'compenent/admin/PaymentHomePage';
import MembersPaymentHistory from 'compenent/admin/MembersPaymentHistory';
import IndividualReceipts from 'compenent/admin/IndividualReceipts';
import ClientPaymentAdmin from 'compenent/admin/ClientPaymentAdmin';

import HomePage from './compenent/reg/HomePage';
import MemberProfile from './compenent/reg/MemberProfile';
import Reg from './compenent/reg/Reg'
import LogInMember from 'compenent/reg/LogInMember';
import ClientPayment from 'compenent/reg/ClientPayment';
import IndividualReceiptsClient from 'compenent/reg/IndividualReceiptsClient';




function App() {

  

  const [routerAuth,setRouterAuth]=useState(true)

  return (
    <Router>

    <div className="App" basename='/admin_suvat_progress' >
  
      <Routes>
        
        

        <Route path="/admin_edit" element={<PhoneNumberList/>}/>
        <Route path="/listofmembers" element={<ListOfMembers/>}/>
        <Route path="/listofphonenumber" element={<ListOfPhoneNumber/>}/>
        <Route path="/adminupdatemember/:phone_number" element={<AdminUpdateMember/>}/>
        <Route path="/paymentpendingList" element={<PaymentPendingList/>}/>
        <Route path="/receiptapproval/:id" element={<ReceiptApproval/>}/>
        <Route path="/paymenthomepage" element={<PaymentHomePage/>}/>
        <Route path="/memberspaymenthistory" element={<MembersPaymentHistory/>}/>
        <Route path="/individualreceipts/:id" element={<IndividualReceipts/>}/>
        <Route path="/clientpaymentadmin" element={<ClientPaymentAdmin/>}/>




        <Route path="/adminlogin" element={<AdminLogIn/>}/>


        
        <Route path="/" element={<HomePage/>}/>
        <Route path="/registretion" element={<Reg/>}/>
        <Route path="/loginmember" element={<LogInMember/>}/>
        <Route path="/memberprofile" element={<MemberProfile/>}/>
        <Route path="/clientpayment" element={<ClientPayment/>}/>
        <Route path="/individualreceiptsclient/:id" element={<IndividualReceiptsClient/>}/>





     



     </Routes>

    </div>
    
    </Router>
  );
}

export default App;
