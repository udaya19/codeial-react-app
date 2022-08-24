import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import {Home,Login} from '../pages';
import {Loader,NavBar} from './';
import { Routes, Route } from 'react-router-dom';
function App() {
  const [posts,setPosts] = useState([]); 
  const [loading,setLoading] = useState(true); 
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if(response.success){
        setPosts(response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if(loading){
    return <Loader />
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element = {<Home posts={posts} />} />
        <Route path='/login' element = {<Login  />} />
      </Routes>
    </div>
  );
}

export default App;
