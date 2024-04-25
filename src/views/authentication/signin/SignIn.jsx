import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import Input from '../../../components/inputbox/Input'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { emailCertificationRequest, idCheckRequest ,checkCertificationRequest, signUpRequest, signInRequest} from '../../../constants/apis';
import { CERTIFICATION_FAIL, DATABASE_ERROR, DUPLICATE_ID, MAIL_FAIL, SIGN_IN_FAIL, SUCCESS, VALIDATION_FAILED } from '../../../constants/ResponseCode';
import Footer from '../../../layouts/Footer/Footer';


function SignIn() {
  
  
  
    const idRef = useRef();
    const passwordRef = useRef();

    const [cookie,setCookie] = useCookies();    

  
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');

    

    const [message,setMessage] = useState('');





    const navigate = useNavigate();

    const signInResponse = (responseBody) => {
        if(!responseBody) return;
        const {code} = responseBody;
        if(code == VALIDATION_FAILED) alert('아이디와 비밀번호를 입력하세요.')
        if(code == SIGN_IN_FAIL) setMessage('로그인 정보가 일치하지 않습니다')
        if(code == DATABASE_ERROR) setMessage('데이터베이스 오류입니다.')
        if(code !== SUCCESS) return;

        const {token,expirationTime} = responseBody;
        const now = (new Date().getTime())*1000;
        const expires = new Date(now+expirationTime);

        setCookie('accessToken',token,{expires,path:'/'});
        navigate('/')
    }

    


    
    const onIdChangeHandler = (event) => {
        
        const {value} = event.target;
        setId(value)
        setMessage('')
        

    };
    const onPasswordChangeHandler = (event) => {
        const {value} = event.target;
        setPassword(value)
        setMessage('')
     
    };
  

    
    const onSignUpButtonClickHandler = () => {
        
        navigate('/auth/sign-up')

    }
    const onSignInButtonClickHandler = () => {
        if(!id || !password){
            alert('아이디와 비밀번호 모두 입력하세요.')
            return;
        }
        const requestBody = {id,password};
        signInRequest(requestBody).then(signInResponse)
    }
    const onIdKeyDownHandler = (event) => {
        
       
        if(event.key !== 'Enter') return;
        if(!passwordRef.current) return;
        passwordRef.current.focus();
        
        
    };
    const onPasswordKeyDownHandler = (event) => {
        
        
        if(event.key !== "Enter") return;
        onSignInButtonClickHandler();
        
    };

    return (
    <div className='sign-in-wrapper'>
        <div className='sign-in-image'></div>
        <div className='sign-in-container'>
            <div className='sign-in-box'>
                <div className='sign-in-title'>{'임대주택 가격 서비스'}</div>
                <div className='sign-in-content-box'>
                    
                    <div className='sign-in-content-input-box'>
                        <Input ref={idRef} title='아이디' placeholder='아이디를 입력해주세요' type='text' value={id} onChange={onIdChangeHandler}   onKeyDown={onIdKeyDownHandler}></Input>
                        <Input ref={passwordRef} title='비밀번호' placeholder='비밀번호를 입력해주세요' type='password' value={password} onChange={onPasswordChangeHandler} isErrorMessage={true} message={message} onKeyDown={onPasswordKeyDownHandler}></Input>
                        
                    </div>
                    <div className='sign-in-content-button-box'>
                        <div className={'primary-button-lg full-width'} onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                        <div className='text-link-lg full-width'onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                    </div>
                    <div className='sign-in-content-divier'></div>
                    <div className='sign-in-content-sns-sign-in-box'>
                        <div className='sign-in-content-sns-sign-in-title'>{'SNS 로그인'}</div>
                        <div className='sign-in-content-sns-sign-in-button-box'>
                            <div className='kakao-sign-in-button'></div>
                            <div className='naver-sign-in-button'></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default SignIn
