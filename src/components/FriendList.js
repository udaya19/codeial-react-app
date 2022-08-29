import styles from '../styles/home.module.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index';
const FriendList = () =>{
    const auth = useAuth();
    const {friends = []} = auth.user;
    return(
        <div className={styles.firendsList}>
        <div className={styles.header}>
            Friends
        </div>
        {friends && friends.length === 0 && (
            <div className={styles.noFriends} >No friends found</div>
        )}
        {friends && friends.map(friend => <div key={`friend-${friend._id}`} >
            <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                <div className={styles.friendsImg}>
                    <img src='https://cdn2.iconfinder.com/data/icons/lightly-icons/30/user-480.png' alt='' />
                </div>
                <div className={styles.friendsName}>
                    {friend.to_user.email}
                </div>
            </Link>
        </div>)}
    </div>
    )
    
}

export default FriendList