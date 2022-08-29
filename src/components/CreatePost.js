import styles from '../styles/home.module.css'
import { useState } from 'react';
const CreatePost = () => {
    const [post,setPost] = useState('');
    const [addingPost,setAddingPost] = useState(false);
    const handleAddPostClick = () => {};
    return(
        <div className={styles.createPost} >
            <textarea className={styles.addPost} onChange = {(e)=>{setPost(e.target.value)}} />
            <button className={styles.addPostBtn} onClick={handleAddPostClick} disabled={addingPost} >
                {addingPost?'Adding Post...':'Add Post'}
            </button>
        </div>
    )
}

export default CreatePost;