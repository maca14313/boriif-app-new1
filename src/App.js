import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Counter } from './features/counter/Counter';
import PhoneNumberList from './compenent/admin/PhoneNumberList';
import ListOfMembers from './compenent/admin/ListOfMembers';
import ListOfPhoneNumber from './compenent/admin/ListOfPhoneNumber';
import AdminUpdateMember from './compenent/admin/AdminUpdateMember';
import AdminLogIn from 'compenent/admin/AdminLogIn';

import HomePage from './compenent/reg/HomePage';
import MemberProfile from './compenent/reg/MemberProfile';
import Reg from './compenent/reg/Reg'
import LogInMember from 'compenent/reg/LogInMember';




function App() {

  // for admin git remote add origin https://github.com/maca14313/nameApp1.git
  // git remote add origin https://github.com/maca14313/suvat_progress.git
  // git remote add origin https://github.com/maca14313/admin_suvat_progress.git

  const [routerAuth,setRouterAuth]=useState(true)

  return (
    <Router basename='/admin_suvat_progress'>

    <div className="App">
  
      <Routes>
        
        

        <Route path="/admin_edit" element={<PhoneNumberList/>}/>
        <Route path="/listofmembers" element={<ListOfMembers/>}/>
        <Route path="/listofphonenumber" element={<ListOfPhoneNumber/>}/>
        <Route path="/adminupdatemember/:phone_number" element={<AdminUpdateMember/>}/>
        <Route path="/" element={<AdminLogIn/>}/>


        
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/registretion" element={<Reg/>}/>
        <Route path="/loginmember" element={<LogInMember/>}/>
        <Route path="/memberprofile" element={<MemberProfile/>}/>



     



     </Routes>

    </div>
    
    </Router>
  );
}

export default App;
