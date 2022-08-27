import {Home,Login,Settings} from '../pages';
import {Loader,NavBar} from './';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/index';
import { SignUp } from '../pages/SignUp';
const PrivateRoute = ()=>{
  const auth = useAuth();
  return auth.user?<Settings />:<Navigate to='/login' />
}
function App() {
  
 
  const auth = useAuth();

  if(auth.loading){
    return <Loader />
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/login' element = {<Login  />} />
        <Route path='/register' element = {<SignUp />} />
        {/* <Route path='/settings' element = {<Settings />} /> */}
        <Route element={<PrivateRoute/>}>
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
