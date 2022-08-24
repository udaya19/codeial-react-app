import styles from '../styles/login.module.css'
const Login = () => {
    return (
        <form className= {styles.loginForm}>
            <span className={styles.loginSignupHeader} >
                LogIn
            </span>
            <div className={styles.field}>
                <input type='email' placeholder='Email' required />
            </div>
            <div className={styles.field}>
                <input type='password' placeholder='Password' required />
            </div>
            <div className={styles.field}>
                <button>LogIn</button>
            </div>
        </form>
    )
}

export default Login 