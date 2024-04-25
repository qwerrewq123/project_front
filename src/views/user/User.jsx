import React, { useState } from 'react'
import './style.css'
import useLoginUserStore from '../../stores/UseLoginUserStore'
const User = () => {
  
  
  const {loginUser}  = useLoginUserStore();

  const [isMyPage,setMyPage] = useState(true);
  
  const [user,setUser] = useState(null);
  
  
  
  
  return (
    <>
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ?
          <div className='user-top-my-profile-image-box'>
            <div className='user-top-profile-image' ></div>
          </div> :
          <div className='user-top-profile-image-box'></div>
          }
          <div className='user-top-profile-image-box'></div>
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              
              {isMyPage ?
              <>
              <div className='user-top-info-nickname'>1231231</div>
              <div className='icon-button'>
                <div className='icon edit-icon'></div>
              </div>
              </>:
              <div className='user-top-info-nickname'>1231231</div>
              }
            </div>
            <div className='user-top-info-email'>12332131</div>
          </div>
        </div>
      </div>
    
    
    
    
    
    
    </>
  )
}

export default User
