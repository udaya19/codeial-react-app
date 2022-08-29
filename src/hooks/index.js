import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers';
import {editProfile, fetchUserFriends, login as userLogin,register,getPosts} from '../api';
import { setItemInLocalStorage,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage } from '../utils';
import { getItemInLocalStorage } from '../utils/index';
import jwt from 'jwt-decode'
import { PostsContext } from '../providers/PostProvider';
export const useAuth = ()=>{
    return useContext(AuthContext);
}
export const useProvideAuth = () =>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const getUser = async() => {
            const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            if(userToken){
                const user = jwt(userToken);
                const response = await fetchUserFriends();
                let friends = []
                if(response.success){
                    friends=response.data.friends
                }
                else{
                    friends = [];
                }
                setUser({
                    ...user,
                    friends
                })
                setUser(user);
            }
            setLoading(false)
        }
       getUser();
    },[]);
    const updateUser = async(userId,name,password,confirmPassword)=>{
        const response = await editProfile(userId,name,password,confirmPassword);
        console.log(response);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.token?response.data.token:null);
            return{
                success:true
            }
        }
        else{
            return{
                success:false,
                message:response.message
            }
        }
    }
    const login = async (email,password)=>{
        const response = await userLogin(email,password);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.token?response.data.token:null);
            return{
                success:true
            }
        }
        else{
            return{
                success:false,
                message:response.message
            }
        }
    };
    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
        if (response.success) {
            return {
              success: true,
            };
          } else {
            return {
              success: false,
              message: response.message,
            };
          }
    }
    const updateUserFriends = (addFriend,friend)=>{
        if(addFriend){
            setUser({
                ...user,
                friends:[...user.friends,friend],
            })
            return
        }

    }
    return{
        user,
        loading,
        login,
        logout,
        signup,
        updateUser,
        updateUserFriends
    }
}

export const usePosts = () => {
    return useContext(PostsContext)
}
export const useProvidePosts = () =>{
    const [posts,setPosts] = useState(null);
    const [loading,setLoading] = useState(true);
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
    const addPostToState = (post) =>{
        const newPosts = [post, ...posts];
        setPosts(newPosts);
    }
    return{
       data:posts,
       loading,
       addPostToState
    }
}
