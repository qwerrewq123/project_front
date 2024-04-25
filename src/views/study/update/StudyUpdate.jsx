import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH, STUDY_DETAIL_PATH, STUDY_PATH, STUDY_UPDATE_PATH } from '../../../constants/path';
import './style.css'
import { deleteStudyRequest, getStudyRequest } from '../../../constants/apis';
import useLoginUserStore from '../../../stores/UseLoginUserStore';
import { useCookies } from 'react-cookie';
import { patchStudyRequest } from '../../../constants/apis';
import './style.css'
import { publishStudyRequest } from '../../../constants/apis';
import { closeStudyRequest } from '../../../constants/apis';
import { joinStudyRequest } from '../../../constants/apis';
import { leaveStudyRequest } from '../../../constants/apis';


const StudyUpdate = () => {
  
    
    const [study, setStudy] = useState(null);

    const [shortDescription,setShortDescription] =useState('')

    const [fullDescription, setFullDescription]=useState('')

    const [title,setTitle] = useState('')

    const [published,setPublished] = useState(false)   

    const [closed,setClosed] = useState(false)   
    
    const {loginUser} = useLoginUserStore();
  
    const [showIntroduceButton,setShowIntroduceButton] = useState(true);  

    const [showProfileImageButton,setShowProfileImageButton] = useState(false);  

    const [showStudyButton,setShowStudyButton] = useState(false);  

    const navigate = useNavigate();

    const [studyPublished, setStudyPublished] = useState(false);  

    const [studyclosed, setStudyclosed]= useState(false);

    const {studyNumber}= useParams();

    const [cookies,setCookie] = useCookies();



    const onIntroduceButtonClassName = showIntroduceButton ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"

    const onProfileImageButtonClassName = showProfileImageButton ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"

    const onStudyButtonClassName = showStudyButton ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"


    
    const onShortDescriptionChangeHandler = (event) =>{
            
            const {value} = event.target;
            setShortDescription(value)
        
    }
    
    const onFullDescriptionChangeHandler = (event) =>{
        
            const {value} = event.target;
            setFullDescription(value)
        
    }
    
    const onIntroduceButtonClickHandler = () => {
        setShowIntroduceButton(true)
        setShowProfileImageButton(false)
        setShowStudyButton(false)
    }

    const onProfileImageButtonClickHandler = () => {
        setShowIntroduceButton(false)
        setShowProfileImageButton(true)
        setShowStudyButton(false)
    }
  
    const onStudyClickButtonHandler = () => {
        setShowIntroduceButton(false)
        setShowProfileImageButton(false)
        setShowStudyButton(true)
    }


    const onPublishStudyButtonClickHandler = () =>{
        if(!studyNumber ||!study || !loginUser || !cookies.accessToken) return;
        if(study.manager.userId !== loginUser.userId) return;
        const requestBody = {};
        publishStudyRequest(studyNumber,requestBody,cookies.accessToken).then(publishStudyResponse)

    }

    const onCloseStudyButtonClickHandler = () =>{
        if(!studyNumber ||!study || !loginUser || !cookies.accessToken) return;
        if(study.manager.userId !== loginUser.userId) return;
        const requestBody = {};
        closeStudyRequest(studyNumber,requestBody,cookies.accessToken).then(closeStudyResponse)
    }

    

    const onDeleteStudyButtonClickHandler = () =>{
        if(!studyNumber ||!study || !loginUser || !cookies.accessToken) return;
        if(study.manager.userId !== loginUser.userId) return;
        deleteStudyRequest(studyNumber,cookies.accessToken).then(deleteStudyResponse)
    }

    

    const onPatchStudyButtonClickHandler = () =>{
        if(!studyNumber || !study || !loginUser || !cookies.accessToken) return;
        
        if(study.manager.userId !== loginUser.userId) return;
        const requestBody = {shortDescription,fullDescription}
        
        patchStudyRequest(studyNumber,requestBody,cookies.accessToken).then(patchStudyResponse)
        
    }
    
    
    const onStudyBannerClickHandler = () =>{
        navigate(STUDY_PATH()+'/'+STUDY_DETAIL_PATH(studyNumber))
    }
    
    const deleteStudyResponse = (responseBody) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        console.log(code)
        
        if(code ==='VF') alert('잘못된 접근입니다')
        if(code ==='NU') alert('존재하지 않는 유저이니다')
        if(code ==='NS') alert('존재하지 않는 스터디게시물입니다')
        if(code ==='AF') alert('인증에 실패했습니다')
        if(code ==='NP') alert('권한이 없습니다')
        if(code ==='DBE') alert('데이터베이스 오류입니다')
        if(code !=='SU') return;
        navigate(MAIN_PATH())
    }


    const patchStudyResponse = (responseBody) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        if(code ==='VF') alert('잘못된 접근입니다')
        if(code ==='NU') alert('존재하지 않는 유저이니다')
        if(code ==='NS') alert('존재하지 않는 스터디게시물입니다')
        if(code ==='AF') alert('인증에 실패했습니다')
        if(code ==='NP') alert('권한이 없습니다')
        if(code ==='DBE') alert('데이터베이스 오류입니다')
        if(code !=='SU') return;
        
        
        
        navigate(STUDY_PATH()+'/'+STUDY_DETAIL_PATH(studyNumber))
        
    }


    const getStudyResponse = (responseBody) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        // console.log(code)
        if(code === 'NS') alert('존재하지않습니다')
        if(code === 'DBE') alert('데이터베이스오류입니다')
        if(code !== 'SU'){
            navigate(MAIN_PATH())
            return;
        }
        const {title,shortDescription,fullDescription,published,closed} =responseBody
        const study = {...responseBody};
        setShortDescription(shortDescription)
        setFullDescription(fullDescription)
        setStudy(study);
        setTitle(title);
        setPublished(published)
        setClosed(closed)
        

        
    }
    
    
    const publishStudyResponse = (responseBody) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        console.log(code)
        
        if(code ==='VF') alert('잘못된 접근입니다')
        if(code ==='NU') alert('존재하지 않는 유저이니다')
        if(code ==='NS') alert('존재하지 않는 스터디게시물입니다')
        if(code ==='AF') alert('인증에 실패했습니다')
        if(code ==='NP') alert('권한이 없습니다')
        if(code ==='DBE') alert('데이터베이스 오류입니다')
        if(code !=='SU') return;
        setPublished(true)
        navigate(STUDY_PATH()+'/'+STUDY_UPDATE_PATH(studyNumber))
        
        
        
    }


    const closeStudyResponse = (responseBody) =>{
        if(!responseBody) return;
        const {code} = responseBody;
        console.log(code)
        
        if(code ==='VF') alert('잘못된 접근입니다')
        if(code ==='NU') alert('존재하지 않는 유저이니다')
        if(code ==='NS') alert('존재하지 않는 스터디게시물입니다')
        if(code ==='AF') alert('인증에 실패했습니다')
        if(code ==='NP') alert('권한이 없습니다')
        if(code ==='DBE') alert('데이터베이스 오류입니다')
        if(code !=='SU') return;
        setClosed(true)
        navigate(STUDY_PATH()+'/'+STUDY_UPDATE_PATH(studyNumber))
        
    }



    
    
    
    useEffect(() =>{
        
        const accessToken = cookies.accessToken;
        
        if(!accessToken){
        navigate(MAIN_PATH())
        return ;
        }   
        
        if(!studyNumber){
            navigate(MAIN_PATH())
            return;
        }
        
        getStudyRequest(studyNumber).then(getStudyResponse)

        

    },[studyNumber])
    if(!loginUser){
        return <></>
    }
    if(!study) return <></>
    if(loginUser.userId !== study.manager.userId){
        navigate(MAIN_PATH())
    }
    // console.log(study)
    
    return (
    <>
    
    
    
    <div className="row pt-4 text-left justify-content-center bg-light ">
            <div className='col-2'> </div>
                <div className="col-6 ">
                    <div href="#" className="text-decoration-none" >
                        <span onClick = {onStudyBannerClickHandler}  className="h2 click">{title}</span>
                    </div>
                </div>
                
                
                
            </div>
            
            
            <div className="row  bg-light m-4">
                <div className='col-2'></div>
                <div className="col-6">
                    <p className="lead" >{shortDescription}</p>
                </div>
            </div>



    

    {showIntroduceButton && <div class="row mt-3 "> 
    
    
        <div class="col-2 row">

            <div className='col-2'></div>
            <div className='col-9 '>
                <div  class="list-group">
                    <div className={onIntroduceButtonClassName} onClick={onIntroduceButtonClickHandler}
                        >소개</div>
                    <div className={onProfileImageButtonClassName} onClick={onProfileImageButtonClickHandler}
                        >프로필 이미지</div>
                    
                    <div className={onStudyButtonClassName} onClick={onStudyClickButtonHandler}
                        >스터디</div>
                </div>
            </div>
        </div>

        <div className='col-8 row'>
            
            
            <div class="form-group">
                <label className="m-3"for="shortDescription">짧은 소개</label>
                <textarea id="shortDescription" type="textarea"  class="form-control"
                            placeholder="스터디를 짧게 소개해 주세요." aria-describedby="shortDescriptionHelp" value={shortDescription} onChange={onShortDescriptionChangeHandler}onClick={onShortDescriptionChangeHandler}>
                </textarea>
                <small className="m-3" id="shortDescriptionHelp" class="form-text text-muted">
                    100자 이내로 스터디를 짧은 소개해 주세요.
                </small>
                <small class="invalid-feedback">짧은 소개를 입력하세요.</small>
                
            </div>


            <div class="form-group">
                <label className="m-3" for="fullDescription">상세 소개</label>
                <textarea id="fullDescription" type="textarea"  class="editor form-control"
                            placeholder="스터디를 자세히 설명해 주세요." aria-describedby="fullDescriptionHelp" value={fullDescription} onChange={onFullDescriptionChangeHandler} onClick={onFullDescriptionChangeHandler}></textarea>
                <small className="m-3" id="fullDescriptionHelp" class="form-text text-muted">
                    스터디의 목표, 일정, 진행 방식, 사용할 교재 또는 인터넷 강좌 그리고 모집중인 스터디원 등 스터디에 대해 자세히 적어 주세요.
                </small>
                <small class="invalid-feedback">상세 소개를 입력하세요.</small>
                
            </div>


            <div class="form-group click">
                <div class="btn btn-primary btn-block mb-5 mt-5" onClick={onPatchStudyButtonClickHandler}
                        aria-describedby="submitHelp">수정하기</div>
            </div>

            


            
        </div>

    </div>}  
    
    
    
    
    
    
    {showProfileImageButton && <div class="row mt-3 "> 
    
    
        <div class="col-2 row">

            <div className='col-2'></div>
            <div className='col-9 '>
                <div  class="list-group">
                    <div className={onIntroduceButtonClassName} onClick={onIntroduceButtonClickHandler}
                        >소개</div>
                    <div className={onProfileImageButtonClassName} onClick={onProfileImageButtonClickHandler}
                         >프로필 이미지</div>
                    
                    <div className={onStudyButtonClassName} onClick={onStudyClickButtonHandler}
                         >스터디</div>
                </div>
            </div>
        </div>

        <div className='col-8 row'>
            <h5 class="col-sm-12">스터디 공개 및 종료</h5>
            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-info" role="alert">
                    스터디를 다른 사용자에게 공개할 준비가 되었다면 버튼을 클릭하세요.<br/>
                    소개, 배너 이미지, 스터디 주제 및 활동 지역을 등록했는지 확인하세요.<br/>
                    스터디를 공개하면 주요 활동 지역과 스터디 주제에 관심있는 다른 사용자에게 알림을 전송합니다.
                </div>
                <div class="form-group">
                    <div onClick={onPublishStudyButtonClickHandler}class="btn btn-outline-primary my-3 click" type="submit" aria-describedby="submitHelp">스터디 공개</div>
                </div>
            </form>


            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-warning" role="alert">
                    스터디 활동을 마쳤다면 스터디를 종료하세요.<br/>
                    스터디를 종료하면 더이상 팀원을 모집하거나 모임을 만들 수 없으며, 스터디 경로와 이름을 수정할 수 없습니다.<br/>
                    스터디 모임과 참여한 팀원의 기록은 그대로 보관합니다.
                </div>
                <div class="form-group">
                    <div onClick={onCloseStudyButtonClickHandler} class="btn btn-outline-warning my-3 click" type="submit" aria-describedby="submitHelp">스터디 종료</div>
                </div>
            </form>


            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div  class="col-sm-12 alert alert-info">
                    이 스터디는 <span class="date-time" ></span>에 종료됐습니다.<br/>
                    다시 스터디를 진행하고 싶다면 새로운 스터디를 만드세요.<br/>
                </div>
            </form>


            <h5 class="col-sm-12 text-danger">스터디 삭제</h5>
            <form class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-danger" role="alert">
                    스터디를 삭제하면 스터디 관련 모든 기록을 삭제하며 복구할 수 없습니다. <br/>
                    <b>다음에 해당하는 스터디는 자동으로 삭제 됩니다.</b>
                    <ul>
                        <li>만든지 1주일이 지난 비공개 스터디</li>
                        <li>스터디 공개 이후, 한달 동안 모임을 만들지 않은 스터디</li>
                        <li>스터디 공개 이후, 모임을 만들지 않고 종료한 스터디</li>
                    </ul>
                </div>
                <div class="form-group">
                    <div onClick={onDeleteStudyButtonClickHandler} class="btn btn-outline-danger click my-3" type="submit" aria-describedby="submitHelp">스터디 삭제</div>
                </div>
            </form>
        </div>

    </div>} 



    {showStudyButton && !published && !closed &&<div class="row mt-3 "> 
    
    
        <div class="col-2 row">

            <div className='col-2'></div>
            <div className='col-9 '>
                <div  class="list-group">
                    <div className={onIntroduceButtonClassName} onClick={onIntroduceButtonClickHandler}
                        >소개</div>
                    <div className={onProfileImageButtonClassName} onClick={onProfileImageButtonClickHandler}
                         >프로필 이미지</div>
                    
                    <div className={onStudyButtonClassName} onClick={onStudyClickButtonHandler}
                         >스터디</div>
                </div>
            </div>
        </div>

        <div className='col-8 row'>
            <h5 class="col-sm-12">스터디 공개 및 종료</h5>
            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-info" role="alert">
                    스터디를 다른 사용자에게 공개할 준비가 되었다면 버튼을 클릭하세요.<br/>
                    소개, 배너 이미지, 스터디 주제 및 활동 지역을 등록했는지 확인하세요.<br/>
                    스터디를 공개하면 주요 활동 지역과 스터디 주제에 관심있는 다른 사용자에게 알림을 전송합니다.
                </div>
                <div class="form-group">
                    <div onClick={onPublishStudyButtonClickHandler}class="btn btn-outline-primary my-3 click" type="submit" aria-describedby="submitHelp">스터디 공개</div>
                </div>
            </form>


            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-warning" role="alert">
                    스터디 활동을 마쳤다면 스터디를 종료하세요.<br/>
                    스터디를 종료하면 더이상 팀원을 모집하거나 모임을 만들 수 없으며, 스터디 경로와 이름을 수정할 수 없습니다.<br/>
                    스터디 모임과 참여한 팀원의 기록은 그대로 보관합니다.
                </div>
                <div class="form-group">
                    <div onClick={onCloseStudyButtonClickHandler} class="btn btn-outline-warning my-3 click" type="submit" aria-describedby="submitHelp">스터디 종료</div>
                </div>
            </form>


            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div  class="col-sm-12 alert alert-info">
                    이 스터디는 <span class="date-time" ></span>에 종료됐습니다.<br/>
                    다시 스터디를 진행하고 싶다면 새로운 스터디를 만드세요.<br/>
                </div>
            </form>


            <h5 class="col-sm-12 text-danger">스터디 삭제</h5>
            <form class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-danger" role="alert">
                    스터디를 삭제하면 스터디 관련 모든 기록을 삭제하며 복구할 수 없습니다. <br/>
                    <b>다음에 해당하는 스터디는 자동으로 삭제 됩니다.</b>
                    <ul>
                        <li>만든지 1주일이 지난 비공개 스터디</li>
                        <li>스터디 공개 이후, 한달 동안 모임을 만들지 않은 스터디</li>
                        <li>스터디 공개 이후, 모임을 만들지 않고 종료한 스터디</li>
                    </ul>
                </div>
                <div class="form-group">
                    <div onClick={onDeleteStudyButtonClickHandler} class="btn btn-outline-danger click my-3" type="submit" aria-describedby="submitHelp">스터디 삭제</div>
                </div>
            </form>
        </div>

    </div>} 




    {showStudyButton && published && !closed && <div class="row mt-3 "> 
    
    
        <div class="col-2 row">

            <div className='col-2'></div>
            <div className='col-9 '>
                <div  class="list-group">
                    <div className={onIntroduceButtonClassName} onClick={onIntroduceButtonClickHandler}
                        >소개</div>
                    <div className={onProfileImageButtonClassName} onClick={onProfileImageButtonClickHandler}
                         >프로필 이미지</div>
                    
                    <div className={onStudyButtonClassName} onClick={onStudyClickButtonHandler}
                         >스터디</div>
                </div>
            </div>
        </div>

        <div className='col-8 row'>
            <h5 class="col-sm-12">스터디 공개 및 종료</h5>
            


            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-warning" role="alert">
                    스터디 활동을 마쳤다면 스터디를 종료하세요.<br/>
                    스터디를 종료하면 더이상 팀원을 모집하거나 모임을 만들 수 없으며, 스터디 경로와 이름을 수정할 수 없습니다.<br/>
                    스터디 모임과 참여한 팀원의 기록은 그대로 보관합니다.
                </div>
                <div class="form-group">
                    <div onClick={onCloseStudyButtonClickHandler} class="btn btn-outline-warning my-3 click" type="submit" aria-describedby="submitHelp">스터디 종료</div>
                </div>
            </form>


            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div  class="col-sm-12 alert alert-info">
                    이 스터디는 <span class="date-time" ></span>에 종료됐습니다.<br/>
                    다시 스터디를 진행하고 싶다면 새로운 스터디를 만드세요.<br/>
                </div>
            </form>


            <h5 class="col-sm-12 text-danger">스터디 삭제</h5>
            <form class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-danger" role="alert">
                    스터디를 삭제하면 스터디 관련 모든 기록을 삭제하며 복구할 수 없습니다. <br/>
                    <b>다음에 해당하는 스터디는 자동으로 삭제 됩니다.</b>
                    <ul>
                        <li>만든지 1주일이 지난 비공개 스터디</li>
                        <li>스터디 공개 이후, 한달 동안 모임을 만들지 않은 스터디</li>
                        <li>스터디 공개 이후, 모임을 만들지 않고 종료한 스터디</li>
                    </ul>
                </div>
                <div class="form-group">
                    <div onClick={onDeleteStudyButtonClickHandler} class="btn btn-outline-danger click my-3" type="submit" aria-describedby="submitHelp">스터디 삭제</div>
                </div>
            </form>
        </div>

    </div>} 




    {showStudyButton && published && closed && <div class="row mt-3 "> 
    
    
        <div class="col-2 row">

            <div className='col-2'></div>
            <div className='col-9 '>
                <div  class="list-group">
                    <div className={onIntroduceButtonClassName} onClick={onIntroduceButtonClickHandler}
                        >소개</div>
                    <div className={onProfileImageButtonClassName} onClick={onProfileImageButtonClickHandler}
                         >프로필 이미지</div>
                    
                    <div className={onStudyButtonClassName} onClick={onStudyClickButtonHandler}
                         >스터디</div>
                </div>
            </div>
        </div>

        <div className='col-8 row'>
            <h5 class="col-sm-12">스터디 공개 및 종료</h5>
            


            <form  class="col-sm-12" action="#"  method="post" novalidate>
                <div  class="col-sm-12 alert alert-info">
                    이 스터디는 <span class="date-time" ></span>에 종료됐습니다.<br/>
                    다시 스터디를 진행하고 싶다면 새로운 스터디를 만드세요.<br/>
                </div>
            </form>


            <h5 class="col-sm-12 text-danger">스터디 삭제</h5>
            <form class="col-sm-12" action="#"  method="post" novalidate>
                <div class="alert alert-danger" role="alert">
                    스터디를 삭제하면 스터디 관련 모든 기록을 삭제하며 복구할 수 없습니다. <br/>
                    <b>다음에 해당하는 스터디는 자동으로 삭제 됩니다.</b>
                    <ul>
                        <li>만든지 1주일이 지난 비공개 스터디</li>
                        <li>스터디 공개 이후, 한달 동안 모임을 만들지 않은 스터디</li>
                        <li>스터디 공개 이후, 모임을 만들지 않고 종료한 스터디</li>
                    </ul>
                </div>
                <div class="form-group">
                    <div onClick={onDeleteStudyButtonClickHandler} class="btn btn-outline-danger click my-3" type="submit" aria-describedby="submitHelp">스터디 삭제</div>
                </div>
            </form>
        </div>

    </div>} 
      
      
    



    




    




     
      
      
      
      
      
      
      
      
      
    
    
    
        
    
    
    
    
    
    

    
    
    
    


    





   


    







</>
  )
}

export default StudyUpdate
