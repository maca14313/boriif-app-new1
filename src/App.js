import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Counter } from './features/counter/Counter';
import ListOfMembers from './compenent/admin/ListOfMembers';
import AdminUpdateMember from './compenent/admin/AdminUpdateMember';
import AdminLogIn from 'compenent/admin/AdminLogIn';
import PaymentPendingList from 'compenent/admin/PaymentPendingList';
import PaymentHomePage from 'compenent/admin/PaymentHomePage';
import MembersPaymentHistory from 'compenent/admin/MembersPaymentHistory';
import IndividualReceipts from 'compenent/admin/IndividualReceipts';
import Registration from 'compenent/admin/Registration';
import AdminHomePage from 'compenent/admin/AdminHomePage';
import IdCard from 'compenent/admin/IdCard';
import IndividualIdCard from 'compenent/admin/IndividualIdCard';
import SingleReceipts from 'compenent/admin/SingleReceipts';



import HomePage from './compenent/reg/HomePage';
import Reg from './compenent/reg/Reg'
import LogInMember from 'compenent/reg/LogInMember';
import ClientPayment from 'compenent/reg/ClientPayment';
import Profile from 'compenent/reg/Profile';




function App() {

  

  const [routerAuth,setRouterAuth]=useState(true)

  return (
    <Router>

    <div className="App"  >
  
      <Routes>
        
        

        <Route path="/listofmembers" element={<ListOfMembers/>}/>
        <Route path="/adminupdatemember/:phone_number" element={<AdminUpdateMember/>}/>
        <Route path="/paymentpendingList" element={<PaymentPendingList/>}/>
        <Route path="/paymenthomepage" element={<PaymentHomePage/>}/>
        <Route path="/memberspaymenthistory" element={<MembersPaymentHistory/>}/>
        <Route path="/individualreceipts/:id" element={<IndividualReceipts/>}/>
        <Route path="/adminregistration" element={<Registration/>}/>
        <Route path="/adminhomepage" element={<AdminHomePage/>}/>
        <Route path="/idcard" element={<IdCard/>}/>
        <Route path="/individualidcard/:id" element={<IndividualIdCard/>}/>
        <Route path="/singlereceipts/:id/:receipttrn" element={<SingleReceipts/>}/>






        <Route path="/" element={<AdminLogIn/>}/>


        
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/registretion" element={<Reg/>}/>
        <Route path="/loginmember" element={<LogInMember/>}/>
        <Route path="/clientpayment" element={<ClientPayment/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>



     </Routes>

    </div>
    
    </Router>
  );
}

export default App;
