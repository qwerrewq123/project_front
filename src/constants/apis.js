import axios from "axios";

export const DOMAIN = 'http://localhost:8080';

export const API_DOMAIN = `${DOMAIN}/api/v1`

export const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`
export const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
export const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;
export const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
export const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
export const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;



const authorization = (accessToken) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } }
};

const responseHandler = (response) => {
    const responseBody = response.data;
        
    return responseBody;

}

const errorHandler = (error) =>{
    if(!error.response || !error.response.data) {
        return null;
    }
    const responseBody = error.response.data
    
    return responseBody;
}

export const idCheckRequest = async(requestBody) => {
    
    
    const result =  await axios.post(ID_CHECK_URL(),requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
};

export const emailCertificationRequest = async (requestBody)=>{
    
    const result =  await axios.post(EMAIL_CERTIFICATION_URL(),requestBody)
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const checkCertificationRequest = async (requestBody)=>{
    
    const result =  await axios.post(CHECK_CERTIFICATION_URL(),requestBody)
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const signUpRequest = async (requestBody)=>{
    
    const result =  await axios.post(SIGN_UP_URL(),requestBody)
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const signInRequest = async (requestBody)=>{
    
    const result =  await axios.post(SIGN_IN_URL(),requestBody)
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const getSignInUserRequest = async (accessToken)=>{
    
    const result =  await axios.get(GET_SIGN_IN_USER_URL(),authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};



export const POST_STUDY_URL = () => `${API_DOMAIN}/study`;
export const GET_STUDY_URL = (studyId) => `${API_DOMAIN}/study/${studyId}`;
export const DELETE_STUDY_URL = (studyId) => `${API_DOMAIN}/study/${studyId}`;
export const PATCH_STUDY_URL = (studyId) => `${API_DOMAIN}/study/${studyId}`;
export const PUBLISH_STUDY_URL = (studyId) => `${API_DOMAIN}/study/publish/${studyId}`;
export const CLOSE_STUDY_URL = (studyId) => `${API_DOMAIN}/study/close/${studyId}`;
export const JOIN_STUDY_URL = (studyId) => `${API_DOMAIN}/study/join/${studyId}`;
export const LEAVE_STUDY_URL = (studyId) => `${API_DOMAIN}/study/leave/${studyId}`;
export const GET_ALL_STUDY_URL = () => `${API_DOMAIN}/study/all`;



export const postStudyRequest = async (requestBody,accessToken)=>{
    
    const result =  await axios.post(POST_STUDY_URL(),requestBody,authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};


export const getStudyRequest = async (studyId)=>{
    
    const result =  await axios.get(GET_STUDY_URL(studyId))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const getAllStudyRequest = async ()=>{
    
    const result =  await axios.get(GET_ALL_STUDY_URL())
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const deleteStudyRequest = async (studyId,accessToken)=>{
    
    const result =  await axios.delete(DELETE_STUDY_URL(studyId),authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const patchStudyRequest = async (studyId,requestBody,accessToken)=>{
    
    const result =  await axios.patch(PATCH_STUDY_URL(studyId),requestBody,authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};


export const publishStudyRequest = async (studyId,requestBody,accessToken)=>{
    console.log(PUBLISH_STUDY_URL(studyId))
    const result =  await axios.post(PUBLISH_STUDY_URL(studyId),requestBody,authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const closeStudyRequest = async (studyId,requestBody,accessToken)=>{
    
    const result =  await axios.post(CLOSE_STUDY_URL(studyId),requestBody,authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const joinStudyRequest = async (studyId,requestBody,accessToken)=>{
    
    const result =  await axios.post(JOIN_STUDY_URL(studyId),requestBody,authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};

export const leaveStudyRequest = async (studyId,requestBody,accessToken)=>{
    
    const result =  await axios.post(LEAVE_STUDY_URL(studyId),requestBody,authorization(accessToken))
        .then(responseHandler)
        .catch(errorHandler);
return result;
};
