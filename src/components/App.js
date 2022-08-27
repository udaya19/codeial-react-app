import {Home,Login,Settings} from '../pages';
import {Loader,NavBar} from './';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/index';
import { SignUp } from '../pages/SignUp';
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
        <Route path='/settings' element = {<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
