import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import {Home,Login} from '../pages';
import {Loader,NavBar} from './';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/index';
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
      </Routes>
    </div>
  );
}

export default App;
