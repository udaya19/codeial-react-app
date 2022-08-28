import styles from '../styles/settings.module.css'
// import { useAuth } from '../hooks/index';
// import { useState } from 'react';
// import { useToasts } from 'react-toast-notifications';
const UserProfile = () => {
    const user = {};
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
                    {user?.email}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldName}>
                    Name
                </div>
                <div className={styles.fieldValue}>
                    {user?.name}
                </div>
               
            </div>

            <div className={styles.btnGrp}>
                <button className={`button ${styles.saveBtn}`}>Add Friend</button>
                <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
            </div>
        </div>
    )
}
export default UserProfile