import styles from '../styles/settings.module.css'
// import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/index';
import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { fetchUserProfile, addFriend } from '../api/index';
import { Loader } from '../components';
const UserProfile = () => {
    const [user,setUser] = useState({})
    const [loading,setLoading] = useState(true);
    const [requestInProgress,setRequestInProgress] = useState(false);
    const {userId} = useParams();
    const {addToast} = useToasts()
    const navigate = useNavigate();
    const auth = useAuth();
    console.log(userId);
    useEffect(()=>{
        const getUser = async()=>{
            const response = await fetchUserProfile();
            console.log(response);
            if(response.success){
                setUser(response.data.user)
            }
            else{
                addToast(response.message,{
                    appearance:'error'
                })
                return navigate('/');
            }
            setLoading(false);
        }
        getUser();
    },[userId,navigate,addToast])
    if(loading){
        return <Loader />
    }
    const checkIfUserIsAFriend = () => {
        const friends = auth.user.friends;
        const friendIds = friends.map((friend)=>(friend.to_user._id));
        const index = friendIds.indexOf(userId);
        if(index!==-1){
            return true
        }
        else{
            return false;
        }
    }
    const handleAddFriendClick = async() =>{
        setRequestInProgress(true);
        const response =  await addFriend(userId);
        if(response.success){
            const {frienship}=response.data;
            auth.updateUserFriends(true,frienship);
            addToast("Friend added successfully",{
                appearance:'success'
            })
        }
        else{
            addToast(response.message,{
                appearance:'error'
            })
        }
        setRequestInProgress(false);
    } 
    return(
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png' alt='' />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldName}>
                    Email
                </div>
                
                <div className={styles.fieldValue}>
                    {user.email}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldName}>
                    Name
                </div>
                <div className={styles.fieldValue}>
                    {user.name}
                </div>
               
            </div>

            <div className={styles.btnGrp}>
                {checkIfUserIsAFriend()?
                    <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
                    :
                    <button className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick} disabled={requestInProgress} >
                        {requestInProgress?"Adding Friend":"Add Friend"}
                    </button>
                }
                
                
            </div>
        </div>
    )
}
export default UserProfile