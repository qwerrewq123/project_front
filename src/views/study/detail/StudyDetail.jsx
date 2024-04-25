import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH, STUDY_PATH, STUDY_UPDATE_PATH } from '../../../constants/path';
import useLoginUserStore from '../../../stores/UseLoginUserStore';
import { useCookies } from 'react-cookie';
import { getStudyRequest } from '../../../constants/apis';
import { joinStudyRequest } from '../../../constants/apis';
import { leaveStudyRequest } from '../../../constants/apis';

const StudyDetail = () => {
  
    
    const [study,setStudy] = useState();

    const [isWriter, setIsWriter] = useState(false);
    
    const [showIntroduce,setShowIntroduce] = useState(true);

    const [showMembers,setShowMember] =useState(false);

    const [showSettings,setShowSettings] = useState(false);  

    const navigate = useNavigate();

    const {studyNumber}=useParams();


    const {loginUser} = useLoginUserStore();

    const [cookies,setCookie] =useCookies();
    
    
    const onIntroduceClickHandler = () =>{
        setShowIntroduce(true)
        setShowMember(false)
        setShowSettings(false)
        
    }

    const onMembersClickHandler = () =>{
        
        setShowIntroduce(false)
        setShowMember(true)
        setShowSettings(false)
    }

    const onSettingsClickHandler = () =>{
        

        if(!studyNumber || !loginUser) return;
        if(study.manager.userId !== loginUser.userId) return;
        setShowIntroduce(false)
        setShowMember(false)
        setShowSettings(true)
        navigate(STUDY_PATH()+'/'+STUDY_UPDATE_PATH(studyNumber))
    }
    
    const introduceClassName = showIntroduce ? "nav-item nav-link active click" : "nav-item nav-link click"

    const membersClassName = showMembers ? "nav-item nav-link active click" : "nav-item nav-link click"

    const settingsClassName = showSettings ? "nav-item nav-link active click" : "nav-item nav-link click"

    const getStudyResponse = (responseBody) => {
        if(!responseBody) return;
        const {code} = responseBody;
        console.log(code)
        if(code === 'NS') alert('존재하지않습니다')
        if(code === 'DBE') alert('데이터베이스오류입니다')
        if(code !== 'SU'){
            navigate(MAIN_PATH())
            return;
        }

        const study = {...responseBody};
        
        setStudy(study)
        
        console.log(loginUser)
        console.log(study)
        if(!loginUser) {
            setIsWriter(false)
            return;
        }
        
        setIsWriter(loginUser.userId === study.manager.userId)
        console.log(isWriter)

        console.log(loginUser)
        

        
        
    }


    const onJoinButtonClickHandler = () =>{
        if(!studyNumber ||!study || !loginUser || !cookies.accessToken) return;
        
        const requestBody = {};
        joinStudyRequest(studyNumber,requestBody,cookies.accessToken).then(joinStudyResponse)
        console.log('성공')
    }


    const onLeaveButtonClickHandler = () =>{
        if(!studyNumber ||!study || !loginUser || !cookies.accessToken) return;
        
        const requestBody = {};
        leaveStudyRequest(studyNumber,requestBody,cookies.accessToken).then(leaveStudyResponse)
    }
    
    

    const joinStudyResponse = (responseBody) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        console.log(code)
        
        if(code ==='VF') alert('잘못된 접근입니다')
        if(code ==='NU') alert('존재하지 않는 유저이니다')
        if(code ==='NS') alert('존재하지 않는 스터디게시물입니다')
        if(code ==='AF') alert('인증에 실패했습니다')
        
        if(code ==='DBE') alert('데이터베이스 오류입니다')
        if(code !=='SU') return;
        navigate(MAIN_PATH())
    }


    const leaveStudyResponse = (responseBody) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        console.log(code)
        
        if(code ==='VF') alert('잘못된 접근입니다')
        if(code ==='NU') alert('존재하지 않는 유저이니다')
        if(code ==='NS') alert('존재하지 않는 스터디게시물입니다')
        if(code ==='AF') alert('인증에 실패했습니다')
        
        if(code ==='DBE') alert('데이터베이스 오류입니다')
        if(code !=='SU') return;
        navigate(MAIN_PATH())
    }
    
    useEffect(()=>{
        
        if(!studyNumber){
            navigate(MAIN_PATH())
            return;
        }
        getStudyRequest(studyNumber).then(getStudyResponse)
        
        
        

    },[studyNumber])
    
    if(!study) return <></>
    if(!loginUser) return <></>
    console.log(study)
    
    
    
    
    
    
    
    
    return (
    <>
            <div className="row pt-4 text-left justify-content-center bg-light ">
                <div className='col-2'> </div>
                <div className="col-6 ">
                    <div href="#" className="text-decoration-none" >
                        <span className="h2">{study.title}</span>
                    </div>
                </div>
                
                
                {loginUser.userId !== study.manager.userId && <div className="col-4 text-right justify-content-end">
                    
                    
                   
                    <span 
                          className="btn-group" role="group" aria-label="Basic example">
                        <div className="btn btn-primary" onClick={onJoinButtonClickHandler}>
                            스터디 가입
                        </div>
                        
                    </span>
                    
                    <span  className="btn-group" role="group">
                        <div className="btn btn-outline-warning" onClick={onLeaveButtonClickHandler} >
                            스터디 탈퇴
                        </div>
                        
                    </span>
                    
                </div>}
            </div>
            
            
            <div className="row  bg-light m-4">
                <div className='col-2'></div>
                <div className="col-6">
                    <p className="lead" >{study.shortDescription}</p>
                </div>
            </div>


            <div  class="row px-3 justify-content-center bg-light">
                <div className='col-2'></div>
                <nav class="col-10 nav nav-tabs">
                    <div className={introduceClassName} onClick={onIntroduceClickHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                        </svg> 소개
                    </div>
                    <div className={membersClassName} onClick={onMembersClickHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                        </svg> 구성원
                    </div>
                    {/* <div class="nav-item nav-link click"  >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4-week" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                            <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                        </svg> 모임
                    </div> */}
                    
                    {loginUser.userId === study.manager.userId &&
                    <div 
                    className={settingsClassName} onClick={onSettingsClickHandler} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                        </svg> 설정
                    </div>}
                </nav>
            </div>

            
            
            
            {showIntroduce && <div class="row mt-3 "> 
            
            
              

                <div class="col-2"></div>

                
                
                    <div class="col-8 pt-3 mb-5" >{study.fullDescription}</div>
                
                        
                
                
             
            
            
            
            
            
            
            
            </div>}

            
            {showMembers && <div class="row mt-3 "> 
                <div class="col-2"></div>
                <div class="col-8 pt-3 mb-5" ><ul class="list-unstyled col-10">
                    
                    
                    
                    <li class="media mt-3" >
                    
                    <div  class="mb-4 flexxx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="rounded border bg-light mr-3" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        
                            
                        
                        </svg>



                        <div class="media-body" >
                            <h5 class="mt-0 mb-2"><span >{study.manager.email}</span> </h5>
                            <span >{study.manager.bio}</span>
                        </div>

                        <div>
                            <span class="badge text-bg-primary">Manager</span>

                        </div>
                        
                       
                    </div>


                    {study.members.map((study, index) => {
                    return (
                    <div  class="mb-4 flexxx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="rounded border bg-light mr-3" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        
                            
                        
                        </svg>



                        <div class="media-body" >
                            <h5 class="mt-0 mb-2"><span >{study.email}</span> </h5>
                            <span >{study.bio}</span>
                        </div>

                        <div>
                            <span class="badge text-bg-primary">Member</span>

                        </div>
                        
                       
                    </div> 
                    );
                    })}
                    
                    
                    
                    
                    
                    
                    
                    



                    </li>
                </ul></div>
            </div>
            }
            


            


            





           


            



      
        

      
    </>
  )
}

export default StudyDetail
