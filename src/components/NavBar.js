import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css'
import { useAuth } from '../hooks/index';

const NavBar = () =>{
    const auth = useAuth()
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to='/'>
                    <img alt='logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
                </Link>
            </div>
            <div className={styles.rightNav}>
                {auth.user && <div className={styles.user}>
                    <a href='/'>
                        <img alt='user' src='https://cdn-icons-png.flaticon.com/512/747/747376.png' className={styles.userDp} />
                    </a>
                    <span> {auth.user.name} </span>
                </div>}
                <div className={styles.navLinks} >
                    <ul>
                        {auth.user?(
                            <>
                                <li>
                                    <button onClick={auth.logout} >Logout</button>
                                </li>
                            </>
                        ):(
                            <>
                                <li>
                                    <Link to= '/login'>Login</Link>
                                </li>
                        
                                <li>
                                    <a href='/'>Register</a>
                                </li>
                            </>
                        )}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;