import React, { useRef, useState } from 'react'
import Input from '../../../components/inputbox/Input'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { emailCertificationRequest, idCheckRequest ,checkCertificationRequest, signUpRequest} from '../../../constants/apis';
import { CERTIFICATION_FAIL, DATABASE_ERROR, DUPLICATE_ID, MAIL_FAIL, SUCCESS, VALIDATION_FAILED } from '../../../constants/ResponseCode';



function SignUp() {
  
  
  
    const idRef = useRef();
    const passwordRef = useRef();
    const passwordCheckRef = useRef();
    const emailRef = useRef();
    const certificationNumberRef = useRef();
  
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [email,setEmail] = useState('');
    const [certificationNumber,setCertificationNumber] = useState('');

    const[isIdError,setIdError] = useState(false);
    const[isPasswordError,setPasswordError] = useState(false);
    const[isPasswordCheckError,setPasswordCheckError] = useState(false);
    const[isEmailError,setEmailError] = useState(false);
    const[isCertificationNumberError,setCertificationNumberError] = useState(false);

    const [idMessage,setIdMessage] = useState('');
    const [passwordMessage,setPasswordMessage] = useState('');
    const [passwordCheckMessage,setPasswordCheckMessage] = useState('');
    const [emailMessage,setEmailMessage] = useState('');
    const [certificationNumberMessage,setCertificationNumberMessage] = useState('');

    const [isIdCheck,setIdCheck] = useState(false);
    const [isCertificationCheck,setCertificationCheck] = useState(false)
    const signUpButtonClass = id && password && passwordCheck && email && certificationNumber ? 'primary-button-lg' : 'disable-button-lg';

    const navigate = useNavigate();

    const idCheckResponse = (responseBody) => {
        
        if(!responseBody) return;
        const {code} = responseBody;
        
        
        if(code ===VALIDATION_FAILED) alert('아이디를 입력하세요')
        if(code === DUPLICATE_ID){
            
            setIdError(true);
            setIdMessage('이미 사용중인 아이디입니다')
            setIdCheck(false)
        }
        if( code === DATABASE_ERROR) alert('데이터베이스 오류입니다.')
        if( code !== SUCCESS) return;
        
        setIdError(false);
        setIdMessage('사용 가능한 아이디 입니다.');
        setIdCheck(true);
        
    }
    const emailCertificationResponse = (responseBody ) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        if(code ===VALIDATION_FAILED) alert('아이디와 이메일을 입력하세요')
        if(code === DUPLICATE_ID){
            
            setIdError(true);
            setIdMessage('이미 사용중인 아이디입니다')
            setIdCheck(false)
        }
        if(code === MAIL_FAIL){
            
            alert('이메일 전송에 실패했습니다')
        }
        if( code === DATABASE_ERROR) alert('데이터베이스 오류입니다.')
        if( code !== SUCCESS) return;
        setEmailError(false)
        setEmailMessage('인증번호가 전송되었습니다')

    }
    const checkCertificationResponse = (responseBody ) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        if(code ===VALIDATION_FAILED) alert('아이디, 이메일,인증번호를 입력하세요')
        if(code === CERTIFICATION_FAIL){
            setCertificationNumberError(true)
            setCertificationNumberMessage('인증번호가 일치하지 않습니다')
            setCertificationCheck(false)

            
        }
       
        if( code === DATABASE_ERROR) alert('데이터베이스 오류입니다.')
        if( code !== SUCCESS) return;
        
        setCertificationNumberError(false)
        setCertificationNumberMessage('인증번호가 확인되었습니다')
        setCertificationCheck(true)

    }

    const signUpResponse = (responseBody ) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        if(code ===VALIDATION_FAILED) alert('모든 값을 입력하세요')
        if(code === DUPLICATE_ID){
            
            setIdError(true);
            setIdMessage('이미 사용중인 아이디입니다')
            setIdCheck(false)
        }
        if(code === CERTIFICATION_FAIL){
            setCertificationNumberError(true)
            setCertificationNumberMessage('인증번호가 일치하지 않습니다')
            setCertificationCheck(false)

            
        }
       
        if( code === DATABASE_ERROR) alert('데이터베이스 오류입니다.')
        if( code !== SUCCESS) return;
        
        console.log(1)
        navigate('/auth/sign-in');


    }


    
    const onIdChangeHandler = (event) => {
        
        const {value} = event.target;
        setId(value)
        setIdMessage('')
        setIdCheck(false);

    };
    const onPasswordChangeHandler = (event) => {
        const {value} = event.target;
        setPassword(value)
        setPasswordMessage('')
    };
    const onPasswordCheckChangeHandler = (event) => {
        const {value} = event.target;
        setPasswordCheck(value)
        setPasswordCheckMessage('')
    };
    const onEmailChangeHandler = (event) => {
        const {value} = event.target;
        setEmail(value)
        setEmailMessage('')
    };
    const onCertificationNumberChangeHandler = (event) => {
        const {value} = event.target;
        setCertificationNumber(value)
        setCertificationNumberMessage('')
        setCertificationCheck(false)
    };

    const onIdButtonClickHandler = () => {
        
        if(!id) return;
        const requestBody = {id};
        
        idCheckRequest(requestBody).then(idCheckResponse);

    };
    const onEmailButtonClickHandler = () => {
        if(!id || !email) return;
        const requestBody = {id,email};
        emailCertificationRequest(requestBody).then(emailCertificationResponse)

        
    };
    const onCertificationNumberButtonClickHandler = () => {
        
        if(!id || !email || !certificationNumber) return;
        const requestBody = {id,email,certificationNumber};
        checkCertificationRequest(requestBody).then(checkCertificationResponse)


        
    };
    const onSignUpButtonClickHandler = () => {
        console.log(1)
        if(!email || !id || !password || !passwordCheck || !certificationNumber) return;
        if(!isIdCheck) {
            alert('중복확인은 필수입니다.')
            return
        }
        if (password !== passwordCheck){
            setPasswordCheckError(true)
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다')
            return
        }
        if(!isCertificationCheck){
            alert('이메일 인증은 필수입니다.')
            return;
        }
        const requestBody = {id,password,email,certificationNumber};
        signUpRequest(requestBody).then(signUpResponse)


    }
    const onSignInButtonClickHandler = () => {
        navigate('/auth/sign-in')
    }
    const onIdKeyDownHandler = (event) => {
        
        console.log(1)
        if(event.key !== 'Enter') return;
        onIdButtonClickHandler();
        
    };
    const onPasswordKeyDownHandler = (event) => {
        
        console.log(1)
        if(event.key !== "Enter") return;
        if(!passwordCheckRef.current) return;
        passwordCheckRef.current.focus();
    };
    const onPasswordCheckKeyDownHandler = (event) => {
        console.log(1)
        if(event.key !== 'Enter') return;
        if(!emailRef.current) return;
        emailRef.current.focus();
    };
    const onEmailKeyDownHandler = (event) => {
        console.log(1)
        if(event.key !== 'Enter') return;
        onEmailButtonClickHandler();
    };
    const onCertificationNumberKeyDownHandler = (event) => {
        console.log(1)
        if(event.key !== 'Enter') return;
        onCertificationNumberButtonClickHandler();
    };
  
    return (
    <div className='sign-up-wrapper'>
        <div className='sign-up-image'></div>
        <div className='sign-up-container'>
            <div className='sign-up-box'>
                <div className='sign-up-title'>{'임대주택 가격 서비스'}</div>
                <div className='sign-up-content-box'>
                    <div className='sign-up-content-sns-sign-in-box'>
                        <div className='sign-up-content-sns-sign-in-title'>{'SNS 로그인'}</div>
                        <div className='sign-up-content-sns-sign-in-button-box'>
                            <div className='kakao-sign-in-button'></div>
                            <div className='naver-sign-in-button'></div>
                        </div>
                    </div>
                    <div className='sign-up-content-divier'></div>
                    <div className='sign-up-content-input-box'>
                        <Input ref={idRef} title='아이디' placeholder='아이디를 입력해주세요' type='text' value={id} onChange={onIdChangeHandler} isErrorMessage={isIdError} message={idMessage} buttonTitle='중복 확인' onButtonClick={onIdButtonClickHandler} onKeyDown={onIdKeyDownHandler}></Input>
                        <Input ref={passwordRef} title='비밀번호' placeholder='비밀번호를 입력해주세요' type='password' value={password} onChange={onPasswordChangeHandler} isErrorMessage={isPasswordError} message={passwordMessage} onKeyDown={onPasswordKeyDownHandler}></Input>
                        <Input ref={passwordCheckRef} title='비밀번호 확인' placeholder='비밀번호를 입력해주세요' type='password' value={passwordCheck} onChange={onPasswordCheckChangeHandler} isErrorMessage={isPasswordCheckError} message={passwordCheckMessage} onKeyDown={onPasswordCheckKeyDownHandler}></Input>
                        <Input ref={emailRef} title='이메일' placeholder='이메일 주소를 입력해주세요' type='text' value={email} onChange={onEmailChangeHandler} isErrorMessage={isEmailError} message={emailMessage} buttonTitle='이메일 인증' onButtonClick={onEmailButtonClickHandler} onKeyDown={onEmailKeyDownHandler}></Input>
                        <Input ref={certificationNumberRef} title='인증번호' placeholder='인증번호 4자리를 입력해주세요' type='text' value={certificationNumber} onChange={onCertificationNumberChangeHandler} isErrorMessage={isCertificationNumberError} message={certificationNumberMessage} buttonTitle='인증 확인' onButtonClick={onCertificationNumberButtonClickHandler} onKeyDown={onCertificationNumberKeyDownHandler}></Input>
                    </div>
                    <div className='sign-up-content-button-box'>
                        <div className={signUpButtonClass+' full-width'} onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                        <div className='text-link-lg full-width'onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
