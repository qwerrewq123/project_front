import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH, USER_PATH } from '../../../constants/path';
import useLoginUserStore from '../../../stores/UseLoginUserStore';
import { postStudyRequest } from '../../../constants/apis';
import { useCookies } from 'react-cookie';


const StudyWrite = () => {
  

  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [shortDescription,setShortDescription]= useState('');
  const [fullDescription,setFullDescription]= useState('');
  
  const {loginUser} = useLoginUserStore();

  const [cookies,setCookie] = useCookies();
  
  const postStudyResponse = (responseBody) =>{
    if(!responseBody) return;
    const {code} = responseBody;
    if(code === 'AF' || code ==='NU'){
        navigate(MAIN_PATH())
        return;
    }
    if(code ==='VF') alert('모두 입력하세요')
    if(code ==='DBE') alert('데이터베이스 오류입니다.')
    if(code !== 'SU') return;

    console.log(loginUser);
    if(!loginUser) return;
    const {userId} = loginUser;
    navigate(USER_PATH(userId))

    
  }
  
  
  
  const onTitleChangeHandler = (event) =>{
    const {value} = event.target
    setTitle(value)
    
    

  }
  const onShortDescriptionChangeHandler = (event) =>{
    const {value} = event.target
    setShortDescription(value)
  }
  const onFullDescriptionChangeHandler = (event) =>{
    const {value} = event.target
    setFullDescription(value)
  }

  const onButtonClickHandler = () =>{
    const accessToken = cookies.accessToken;
    if(!accessToken) return;
    const requestBody = {title,shortDescription,fullDescription}
    postStudyRequest(requestBody,accessToken).then(postStudyResponse);
  }

  
  useEffect(()=>{
    const accessToken = cookies.accessToken;
    if(!accessToken){
        navigate(MAIN_PATH())
        return ;
    }
  })

 
  
  return (
    <>
      <div class="container">
        <div class="py-5 my-3 text-center">
            <h2>스터디 개설</h2>
        </div>
        <div class="row justify-content-center">
            
           

            <div class="form-group">
                <label for="title">스터디 이름</label>
                <textarea id="title" type="text"  class="form-control additional"
                        placeholder="스터디 이름" value={title} onChange={onTitleChangeHandler}/>
                <small id="titleHelp" class="form-text text-muted">
                    스터디 이름을 50자 이내로 입력하세요.
                </small>
                
                
            </div>

            <div class="form-group">
                <label for="shortDescription">짧은 소개</label>
                <textarea  id="shortDescription" type="textarea"  class="form-control additional"
                            placeholder="스터디를 짧게 소개해 주세요." value={shortDescription} onChange={onShortDescriptionChangeHandler}></textarea>
                <small id="shortDescriptionHelp" class="form-text text-muted">
                    100자 이내로 스터디를 짧은 소개해 주세요.
                </small>
                
                
            </div>

            <div class="form-group">
                <label for="fullDescription">상세 소개</label>
                <textarea  id="fullDescription" type="textarea"  class="editor form-control additional"
                            placeholder="스터디를 자세히 설명해 주세요."value={fullDescription} onChange={onFullDescriptionChangeHandler} ></textarea>
                <small id="fullDescriptionHelp" class="form-text text-muted">
                    스터디의 목표, 일정, 진행 방식, 사용할 교재 또는 인터넷 강좌 그리고 모집중인 스터디원 등 스터디에 대해 자세히 적어 주세요.
                </small>
                
                
            </div>

            <div class="form-group">
                <div class="btn btn-primary btn-block my-5" onClick={onButtonClickHandler}
                        aria-describedby="submitHelp">스터디 만들기</div>
            </div>
            
        
        </div>
    </div>
       
    </>
  )
}

export default StudyWrite
