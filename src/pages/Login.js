import styles from '../styles/login.module.css'
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loggingIn,setLoggingIn] = useState(false);
    const {addToast} = useToasts();
    const auth = useAuth();
    const navigate = useNavigate();
    console.log(auth);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoggingIn(true);
        if(!email || !password){
            return addToast("Please enter both email and password",{
                appearence:'error',
            })
        }
        const response = await auth.login(email,password);
        if(response.success){
            setLoggingIn(false);
            return addToast("Successfully logged in",{
                appearence:'success',
            })
        }
        else{
            setLoggingIn(false);
            return addToast(response.message,{
                appearence:'error',
            })
        }
    }
    if(auth.user){
        navigate('/');
    }
    return (
        <form className= {styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader} >
                LogIn
            </span>
            <div className={styles.field}>
                <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className={styles.field}>
                <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
            </div>
            <div className={styles.field}>
                <button disabled={loggingIn} >
                    {loggingIn?'Logging in..':'LogIn'}
                </button>
            </div>
        </form>
    )
}

export default Login 