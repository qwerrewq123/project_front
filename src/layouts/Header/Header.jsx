import React, { useEffect, useState } from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MAIN_PATH, SEARCH_PATH, SIGN_IN_PATH, SIGN_UP_PATH, STUDY_DETAIL_PATH, STUDY_PATH, STUDY_UPDATE_PATH, STUDY_WRITE_PATH, USER_PATH } from '../../constants/path';
import { useCookies } from 'react-cookie';
import useLoginUserStore from '../../stores/UseLoginUserStore';





function Header() {
  
  const {pathname} = useLocation();
  
  const {loginUser,setLoginUser,resetLoginUser} = useLoginUserStore();
  
  const [cookies,setCookie]=useCookies();
  
  const[isLogin,setLogin] =useState(false);
  
  const navigate = useNavigate();

  const onLogoClickHandler = () =>{
  navigate(MAIN_PATH());
  }


  const isAuthPage = pathname.startsWith(SIGN_IN_PATH()) || pathname.startsWith(SIGN_UP_PATH())
  const isMainPage = pathname === (MAIN_PATH())
  const isSearchPage = pathname.startsWith(SEARCH_PATH(''))
  const isStudyDetailPage = pathname.startsWith(STUDY_PATH()+'/'+STUDY_DETAIL_PATH(''))
  const isStudyWritePage = pathname.startsWith(STUDY_PATH()+'/'+STUDY_WRITE_PATH())
  const isStudyUpdatePage = pathname.startsWith(STUDY_PATH()+'/'+STUDY_UPDATE_PATH(''))
  const isUserPage = pathname.startsWith(USER_PATH(''))
  
  console.log('가나나나나')
  console.log(pathname)
  const SearchButton = () =>{
    
    //state : 검색버튼 상태
    const [status,setStatus] = useState(false);

    const [word,setWord] =useState('');
    const {searchWord} =useParams();
    
    const onWordChangeHandler = (event) =>{
      const {value} = event.target;
      setWord(value);
    }
    const onSearchButtonClickHandler = () =>{
      if(!status){
        setStatus(!status)
        return;
      }
      navigate(SEARCH_PATH(word))
    }

    useEffect(()=>{
      if(!searchWord){
        setWord(setWord);
        setStatus(true);
      }
    },[])
    
    if(!status){
      return(
        <div className='icon-button' onClick={onSearchButtonClickHandler}><div className='icon search-light-icon'></div></div>
      );
    }


    
    
    return (
    <div className='header-search-input-box'>
      <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onWordChangeHandler}></input>
      <div className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='icon search-light-icon'></div>
      </div>
    </div>
    )
  }


  const MyPageButton = () =>{
    
    const {userId} = useParams();
    
    const onMyPageButtonClickHandler = () => {
      if(!loginUser) return;
      const {userId} = loginUser;
      navigate(USER_PATH(userId))
    }
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      setCookie('accessToken','',{ path: MAIN_PATH(), expires: new Date() })
      navigate(SIGN_IN_PATH())
    }

    const onSignInButtonClickHandler = () => {
      navigate(SIGN_IN_PATH())
    }
    
    if(isLogin && userId === loginUser.userId)
    return (<div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
    )

    if(isLogin)
    return (<><div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>
    <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
      <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
    </svg>
    </>
    )
    
    

    return(
      <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
    )
  }

  useEffect(()=>{
    setLogin(loginUser !== null);
  },[loginUser])
  

  
  return (
    <div id='header'>
        <div className='header-container'>
            <div className='header-left-box' onClick={onLogoClickHandler}>
                <div className='icon-box'>
                    <div className='icon logo-dark-icon'></div>
                </div>
                <div className='heaer-logo'>{' Study Enrollment'}</div>
            </div>
            <div className='header-right-box'>
              {/* {(isAuthPage || isMainPage || isSearchPage || isStudyDetailPage)
              && <SearchButton></SearchButton>}  */}
              {(isMainPage || isSearchPage || isStudyDetailPage || isUserPage || isStudyUpdatePage )
              && <MyPageButton></MyPageButton>}
              
            </div>
        </div> 
    </div>
  )
}

export default Header
