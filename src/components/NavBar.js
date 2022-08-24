import styles from '../styles/navbar.module.css'
const NavBar = () =>{
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href='/'>
                    <img alt='logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
                </a>
            </div>
            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href='/'>
                        <img alt='user' src='https://cdn-icons-png.flaticon.com/512/747/747376.png' className={styles.userDp} />
                    </a>
                    <span>Uday</span>
                </div>
                <div className={styles.navLinks} >
                    <ul>
                        <li>
                            <a href='/'>Login</a>
                        </li>
                        <li>
                            <a href='/'>Logout</a>
                        </li>
                        <li>
                            <a href='/'>Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;