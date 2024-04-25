import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllStudyRequest } from '../../constants/apis';
import { MAIN_PATH, STUDY_DETAIL_PATH, STUDY_PATH } from '../../constants/path';



function Main() {
  
  
  
  const [studies,setStudies] = useState(null);
  const navigate = useNavigate();
  
  
  
  const getStudyResponse = (responseBody) => {
    if(!responseBody) return;
    const {code} = responseBody;
    
    if(code === 'NS') alert('존재하지않습니다')
    if(code === 'DBE') alert('데이터베이스오류입니다')
    if(code !== 'SU'){
        
        return;
    }
    

    const {studies} = responseBody;
    
    setStudies(studies)
    
    
    
    
    
    

    
    
  }
  const onButtonClickHandler = (studyId) => {
    navigate(STUDY_PATH()+'/'+STUDY_DETAIL_PATH(studyId)) 
  }
  useEffect(()=>{

    getAllStudyRequest().then(getStudyResponse);

  },[])
  
  if(!studies) return;


  console.log(studies[0])
  console.log(studies[0].title)
  console.log(studies[0].shortDescription)
  console.log(studies[0].studyId)
  
  
  
  
  
  return (
    <>
    
      <div className='container my-5'>
        <div className='row'>
          <section className='col-md-5 col-lg-1'></section>

          <section className='col-md-7 col-lg-9'>
            <div className='row'>
              
                
              {studies.map((study, index) => {
              return (
                <div className='col-lg-6 py-3'>
                <div className='card'>
                  <div className='overflow-hidden'>
                    <img className='card-img-top' alt='포트폴리오 사진' src='https://media.istockphoto.com/id/1807227379/ko/%EC%82%AC%EC%A7%84/%EA%B3%B5%EB%B6%80%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%B4-%EC%B9%B4%ED%8E%98%EC%97%90%EC%84%9C-%EC%B1%85%EC%9D%84-%EC%9D%BD%EB%8A%94-%EC%95%84%EC%8B%9C%EC%95%84-%EC%82%AC%EC%97%85%EA%B0%80.jpg?s=2048x2048&w=is&k=20&c=oxJa0go1eOqqiZcyTciGOH5nCi2monnMbJi8WPQGhFU='></img>
                  </div>
                  <div className='card-body'>
                    <h4 className='card-title'>{study.title}</h4>
                    <p className='card-text'>{study.shortDescription}</p>
                    <div href='#' className='btn btn-outline-dark btn-sm' onClick={() => onButtonClickHandler(study.studyId)}>스토리보기</div>
                  </div>
                </div>
              </div>
              );
              })}
                    
              {/* <div className='col-lg-6 py-3'>
                <div className='card'>
                  <div className='overflow-hidden'>
                    <img className='card-img-top' alt='포트폴리오 사진' src='https://media.istockphoto.com/id/1807227379/ko/%EC%82%AC%EC%A7%84/%EA%B3%B5%EB%B6%80%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%B4-%EC%B9%B4%ED%8E%98%EC%97%90%EC%84%9C-%EC%B1%85%EC%9D%84-%EC%9D%BD%EB%8A%94-%EC%95%84%EC%8B%9C%EC%95%84-%EC%82%AC%EC%97%85%EA%B0%80.jpg?s=2048x2048&w=is&k=20&c=oxJa0go1eOqqiZcyTciGOH5nCi2monnMbJi8WPQGhFU='></img>
                  </div>
                  <div className='card-body'>
                    <h4 className='card-title'>{studies[0].title}</h4>
                    <p className='card-text'>{studies[0].shortDescription}</p>
                    <div href='#' className='btn btn-outline-dark btn-sm' onClick={() => onButtonClickHandler(studies[0].studyId)}>스토리보기</div>
                  </div>
                </div>
              </div> */}

              {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet doloribus delectus cum laboriosam ipsa eum autem illo quos ex. Doloremque soluta enim laudantium rerum eos in accusamus dolorem esse nihil!</p> */}

            </div>
          </section>
        </div>
      </div>

    
    </>
  )
}

export default Main
