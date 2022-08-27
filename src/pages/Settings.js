import styles from '../styles/settings.module.css'
import { useAuth } from '../hooks/index';
const Settings = () => {
    const auth = useAuth();
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
                    {auth.user?.email}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldName}>
                    Name
                </div>
                <div className={styles.fieldValue}>
                    {auth.user?.name}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldName}>
                    Password
                </div>
                <div className={styles.fieldValue}>
                    <input type='password' />
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldName}>
                    Confirm Password
                </div>
                <div className={styles.fieldValue}>
                    <input type='password' />
                </div>
            </div>
            <div className={styles.btnGrp}>
                <button className={`button ${styles.editBtn}`}>Edit Profile</button>
            </div>
        </div>
    )
}
export default Settings