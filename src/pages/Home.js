import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { Comments, CreatePost } from '../components';
import { useState , useEffect} from 'react';
import { getPosts } from '../api';
import {Loader} from '../components';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index';
import FriendList from '../components/FriendList';
const Home = () =>{
    const [posts,setPosts] = useState([]); 
  const [loading,setLoading] = useState(true); 
  const auth = useAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
    return (

        <div className={styles.home}>
          <div className={styles.postsList}>
              <CreatePost />
              {posts.map((post)=>(
                  <div className={styles.postWrapper} key={`post=${post._id}`} >
                  <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                        alt="user-pic"
                      />
                      <div>
                        <Link to={{
                          pathname:`/user/${post.user._id}`,
                          state:{
                            user:post.user,
                          },
                        }} className={styles.postAuthor}>{post.user.name}</Link>
                        <span className={styles.postTime}>a minute ago</span>
                      </div>
                    </div>
                    <div className={styles.postContent}>{post.content}</div>
          
                    <div className={styles.postActions}>
                      <div className={styles.postLike}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2961/2961957.png"
                          alt="likes-icon"
                        />
                        <span>{post.likes.length}</span>
                      </div>
          
                      <div className={styles.postCommentsIcon}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                          alt="comments-icon"
                        />
                        <span> {post.comments.length} </span>
                      </div>
                    </div>
                    <div className={styles.postCommentBox}>
                      <input placeholder="Start typing a comment" />
                    </div>
          
                    <div className={styles.postCommentsList}>
                      {post.comments.map((comment)=>(
                          <Comments comment = {comment} />
                      ))}
                    </div>
                  </div>
                </div>
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
