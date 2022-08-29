import styles from '../styles/home.module.css'
import { useState } from 'react';
import { addPost } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks/index';
const CreatePost = () => {
    const [post,setPost] = useState('');
    const [addingPost,setAddingPost] = useState(false);
    const {addToast} = useToasts();
    const posts = usePosts();
    const handleAddPostClick = async() => {
        setAddingPost(true);
        const response = await addPost(post);
        console.log(response);
        if(response.success){
            setPost('');
            posts.addPostToState(response.data.post);
            addToast("Post created successfully",{
                appearance:'success'
            })
        }
        else{
            addToast(response.message,{
                appearance:'error',
            })
        }
        setAddingPost(false);
    };
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