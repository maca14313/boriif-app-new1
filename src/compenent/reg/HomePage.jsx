import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import {hostVar} from './VarImportes'

function HomePage() {
  const regInfo=JSON.parse(localStorage.getItem('regInfo')) 
  const [language,setLanguage]=useState(JSON.parse(localStorage.getItem('language'))?JSON.parse(localStorage.getItem('language')):'1')
  const [openModal,setOpenModal]=useState(0)
  const [showLanguage,setShowLanguage]=useState(false)


  const logOut=()=>{
    localStorage.removeItem('regInfo')
    window.location.reload(true)
  }
  const changeLanguage=(l)=>{
        setLanguage(localStorage.setItem('language',JSON.stringify(l)))
        window.location.reload(true)
  }
  return (
    <div className='homeCon'>
        <div className='welcomPage'>

        

         <div className='navCon' >

        

          <div className="navLogo ">BORIIF  <div className='navLogoFullName'></div>



          
          <div className='navConOpener' onClick={()=>setOpenModal(1)}>
            <div className='navConOpenerLine'></div>
            <div className='navConOpenerLine'></div>
            <div className='navConOpenerLine'></div>
          </div> 
          
          </div>

          <div className="navLinksConMiddle">
           
            <Link onClick={()=>(window.location.reload(true))}  className="navLinksConMiddleItem" >  <div style={{display:language=='1'?'flex':'none'}}>Home</div> <div style={{display:language=='2'?'flex':'none'}}>Fuldura</div> <div style={{display:language=='3'?'flex':'none'}}>መነሻ ገጽ</div> <div style={{display:language=='4'?'flex':'none'}}>الرئيسية</div>
</Link>
            <Link to={'/clientpayment'} className="navLinksConMiddleItem" style={{display:regInfo==undefined?'none':'block'}}><div style={{display:language=='1'?'flex':'none'}}>Payment</div> <div style={{display:language=='2'?'flex':'none'}}>Kaffaltii</div> <div style={{display:language=='3'?'flex':'none'}}>ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>الدفع</div></Link>
            <Link  className="navLinksConMiddleItem navLinksConMiddleItemLanguage" onClick={()=>(setShowLanguage(!showLanguage))} ><div style={{display:language=='1'?'flex':'none'}}>Language</div> <div style={{display:language=='2'?'flex':'none'}}>Qooqa</div> <div style={{display:language=='3'?'flex':'none'}}>ቋንቋ</div> <div style={{display:language=='4'?'flex':'none'}}>لغة</div>
         
             <div className='navLinksConMiddleItemLanguageCon' style={{display:showLanguage==true?'flex':'none'}}>

             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('1'))}>English</div>
             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('2'))}>Afaan Oromoo</div>
             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('3'))}>ኣማረኛ</div>
             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('4'))}>العربيه</div>

            </div>
            </Link>
            

            <Link to={`/profile/${regInfo?.id}`} style={{display:regInfo==undefined?'none':'flex'}}  className='navLinksConMiddleItem navLinkM'><div style={{display:language=='1'?'flex':'none'}}>Profile</div> <div style={{display:language=='2'?'flex':'none'}}>Ebsa kee</div> <div style={{display:language=='3'?'flex':'none'}}>መገለጫ</div> <div style={{display:language=='4'?'flex':'none'}}>الملف الشخصي</div></Link>
            <Link to={''} style={{display:regInfo==undefined?'none':'flex'}} onClick={logOut}  className='navLinksConMiddleItem navLinkM'> <div style={{display:language=='1'?'flex':'none'}}>Log Out</div> <div style={{display:language=='2'?'flex':'none'}}>Galme ke Baasuu</div> <div style={{display:language=='3'?'flex':'none'}}>መዝግብ ይቅር</div> <div style={{display:language=='4'?'flex':'none'}}>تسجيل الخروج</div></Link>
            <Link to={'/loginmember'} style={{display:regInfo!=undefined?'none':'flex'}}  className='navLinksConMiddleItem navLinkM'><div style={{display:language=='1'?'flex':'none'}}>Log In</div> <div style={{display:language=='2'?'flex':'none'}}>Galme keetiin Galchuu</div> <div style={{display:language=='3'?'flex':'none'}}>ይግቡ</div> <div style={{display:language=='4'?'flex':'none'}}>تسجيل الدخول</div></Link>
            <Link to={'/registretion'} style={{display:regInfo!=undefined?'none':'flex'}}  className='navLinksConMiddleItem navLinkM'><div style={{display:language=='1'?'flex':'none'}}>Sign Up</div> <div style={{display:language=='2'?'flex':'none'}}>Galme Haaraa</div> <div style={{display:language=='3'?'flex':'none'}}>አዲስ መመዝገብ</div> <div style={{display:language=='4'?'flex':'none'}}>التسجيل الجديد</div></Link>

            
           
          </div>

      

         </div>


         <div className='navConM' style={{display:openModal==1?'block':'none'}} >
                
                <div className='navConMCloser' onClick={()=>setOpenModal(0)}>
                  X
                </div>

<div className="navLinksConMiddleM">

 
  <Link onClick={()=>(window.location.reload(true))}  className="navLinksConMiddleItemM" ><div style={{display:language=='1'?'flex':'none'}}>Home</div> <div style={{display:language=='2'?'flex':'none'}}>Fuula Fulduraa</div> <div style={{display:language=='3'?'flex':'none'}}>መነሻ ገጽ</div> <div style={{display:language=='4'?'flex':'none'}}>الرئيسية</div></Link>
  <Link to={'/clientpayment'}><div className="navLinksConMiddleItemM" style={{display:regInfo==undefined?'none':'flex'}}><div style={{display:language=='1'?'flex':'none'}}>Payment</div> <div style={{display:language=='2'?'flex':'none'}}>Kaffaltii</div> <div style={{display:language=='3'?'flex':'none'}}>ክፍያ</div> <div style={{display:language=='4'?'flex':'none'}}>الدفع</div></div></Link>

  
 

  

 
</div>

<div className="navLinksConM">
<Link  className='navLinkM' onClick={()=>(setShowLanguage(!showLanguage))} style={{color:'white'}} ><div style={{display:language=='1'?'flex':'none'}}>Language</div> <div style={{display:language=='2'?'flex':'none'}}>Qooqa</div> <div style={{display:language=='3'?'flex':'none'}}>ቋንቋ</div> <div style={{display:language=='4'?'flex':'none'}}>لغة</div></Link>

<div className='navLinksConMiddleItemLanguageCon2' style={{display:showLanguage==true?'flex':'none'}}>

             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('1'))}>English</div>
             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('2'))}>Oromiffa</div>
             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('3'))}>ኣማረኛ</div>
             <div className='navLinksConMiddleItemLanguage' onClick={()=>(changeLanguage('4'))}>العربيه</div>

            </div>

<Link to={`/profile/${regInfo?.id}`} style={{display:regInfo==undefined?'none':'flex',color:'white'}}  className='navLinkM' ><div style={{display:language=='1'?'flex':'none'}}>Profile</div> <div style={{display:language=='2'?'flex':'none'}}>Ebsa kee</div> <div style={{display:language=='3'?'flex':'none'}}>መገለጫ</div> <div style={{display:language=='4'?'flex':'none'}}>الملف الشخصي</div></Link>
<Link to={''} style={{display:regInfo==undefined?'none':'flex'}} onClick={logOut}  className='navLinkM'><div style={{display:language=='1'?'flex':'none'}}>Log Out</div> <div style={{display:language=='2'?'flex':'none'}}>Galme ke Baasuu</div> <div style={{display:language=='3'?'flex':'none'}}>መዝግብ ይቅር</div> <div style={{display:language=='4'?'flex':'none'}}>تسجيل الخروج</div></Link>
<Link to={'/loginmember'} style={{display:regInfo!=undefined?'none':'flex'}}  className='navLinkM'><div style={{display:language=='1'?'flex':'none'}}>Log In</div> <div style={{display:language=='2'?'flex':'none'}}>Galme keetiin Galchuu</div> <div style={{display:language=='3'?'flex':'none'}}>ይግቡ</div> <div style={{display:language=='4'?'flex':'none'}}>تسجيل الدخول</div></Link>
<Link to={'/registretion'} style={{display:regInfo!=undefined?'none':'flex'}}  className='navLinkM'><div style={{display:language=='1'?'flex':'none'}}>Sign Up</div> <div style={{display:language=='2'?'flex':'none'}}>Galme Haaraa</div> <div style={{display:language=='3'?'flex':'none'}}>አዲስ መመዝገብ</div> <div style={{display:language=='4'?'flex':'none'}}>التسجيل الجديد</div></Link>
</div>

</div>



           

         <div className='introCon'>
        

           <div className='introConIntro'>
            <div className='introConIntroText introConIntroTextTitle'><div style={{display:language=='1'?'flex':'none'}}>Boreaf Development And Assistant Assoc.</div> <div style={{display:language=='2'?'flex':'none'}}>Waldaa Misoomaa Fi Gargaarsaa.</div> <div style={{display:language=='3'?'flex':'none'}}>ቦሪፍ የልማት እና መረዳጃ ማህበር </div> <div style={{display:language=='4'?'flex':'none'}}>جمعية التنمية والمساعدة</div>
              </div>
              <div className='introConIntroText'><div style={{display:language=='1'?'flex':'none'}}>Coming together is a beginning; keeping together is progress; working together is success.</div> <div style={{display:language=='2'?'flex':'none'}}>Walitti dhufuun jalqaba; waliin ta’uun guddina; waliin hojjechuun milkaa'ina.</div> <div style={{display:language=='3'?'flex':'none'}}>አንድ ላይ መሰብሰብ ጅማሬ ነው; አብሮ መሆን እድገት ነው; አብሮ መስራት ስኬት ነው ::</div> <div style={{display:language=='4'?'flex':'none'}}>التجمع هو بداية؛ البقاء معًا هو تقدم؛ العمل المشترك هو النجاح</div>
              </div>
           </div>

           <div className='introConImgCon'>
           <div className='introConImgConText introConImgConImg'></div>
         </div>

         </div>

        




        </div>













        
    </div>
  )
}

export default HomePage