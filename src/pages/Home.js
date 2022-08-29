import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import {  CreatePost } from '../components';
// import { useState , useEffect} from 'react';
// import { getPosts } from '../api';
import {Loader} from '../components';
import { useAuth, usePosts } from '../hooks/index';
import FriendList from '../components/FriendList';
import Post from '../components/Post';
const Home = () =>{
  const auth = useAuth();
  const posts = usePosts();
  if (posts.loading) {
    return <Loader />;
  }
    return (

        <div className={styles.home}>
          <div className={styles.postsList}>
              <CreatePost />
              {posts.data.map((post)=>(
                  <Post post={post} key={`post-${post._id}`} />
              ))}
          
          </div>
          {auth.user && <FriendList />}
        </div>
      );
}

Home.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default Home;
