
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Route, Routes} from 'react-router-dom';
import SignUp from './views/authentication/signup/SignUp';
import SignIn from './views/authentication/signin/SignIn';
import Main from './views/main/Main';
import User from './views/user/User';
import StudyDetail from './views/study/detail/StudyDetail';
import StudyWrite from './views/study/write/StudyWrite';
import StudyUpdate from './views/study/update/StudyUpdate';
import Container from './layouts/container/Container';
import { MAIN_PATH, SIGN_IN_PATH, SIGN_UP_PATH, STUDY_DETAIL_PATH, STUDY_PATH, STUDY_UPDATE_PATH, STUDY_WRITE_PATH, USER_PATH } from './constants/path';
import {  useCookies } from 'react-cookie';
import { useEffect } from 'react';
import useLoginUserStore from './stores/UseLoginUserStore';
import { getSignInUserRequest } from './constants/apis';



function App() {
  
  const {setLoginUser,resetLoginUser} = useLoginUserStore();

  const [cookies,setCookie] = useCookies();

  const getSignInUserResponse = (responseBody) => {
    
    
    if(!responseBody) return;
    const {code} = responseBody;
    
    if(code === 'AF' || code ==='NU' || code ==='DBE'){
      
      resetLoginUser();
      return;
    }
    const loginUser = {...responseBody}
    setLoginUser(loginUser)
    
    
  }
  
  useEffect(() =>{
    if(!cookies.accessToken){
      
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  },[cookies.accessToken])

  return (
    
    <Routes>
      <Route element={<Container/>}>
        <Route path={SIGN_UP_PATH()} element={<SignUp />} />
        <Route path={SIGN_IN_PATH()} element={<SignIn />} />
        <Route path={MAIN_PATH()} element={<Main />} />
        <Route path={USER_PATH(":userId")} element={<User />} />
        <Route path={STUDY_PATH()}>
          <Route path={STUDY_DETAIL_PATH(":studyNumber")} element={<StudyDetail />} />
          <Route path={STUDY_WRITE_PATH()} element={<StudyWrite />} />
          <Route path={STUDY_UPDATE_PATH(":studyNumber")} element={<StudyUpdate />} />  
        </Route>
      </Route>
    
    
      
      
      
    </Routes>
    
    
  
  );
}

export default App;