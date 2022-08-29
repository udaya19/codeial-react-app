import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css'
import { useAuth } from '../hooks/index';
import { useState, useEffect } from 'react';
import { searchUsers } from '../api';
const NavBar = () =>{
    const auth = useAuth()
    const [results,setResults] = useState([]);
    const [searchText,setSearchText] = useState('');
    useEffect(()=>{
        const fetchUsers = async()=>{
            const response = await searchUsers(searchText);
            if(response.success){
                setResults(response.data.users)
            }
        }
        if(searchText.length>2){
            fetchUsers();
        }
        else{
            setResults([]);
        }
        
    },[searchText])
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to='/'>
                    <img alt='logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
                </Link>
            </div>

            <div className={styles.searchContainer}>
                <img className={styles.searchIcon} src='https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Magnifier-Search-Zoom--512.png' alt='Search Icon' />
                <input placeholder='Search users' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} />
                {results.length>0 && <div className={styles.searchResults}>
                    <ul>
                        {results.map((user)=>(
                            <li className={styles.searchResultsRow} key={`user-${user._id}`}>
                                <Link to={`/user/${user._id}`} >
                                    <img src='https://cdn-icons-png.flaticon.com/512/747/747376.png' alt='' />
                                    <span>{user.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>

            <div className={styles.rightNav}>
                {auth.user && <div className={styles.user}>
                    <Link to='/settings'>
                        <img alt='user' src='https://cdn-icons-png.flaticon.com/512/747/747376.png' className={styles.userDp} />
                    </Link>
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
                                    <Link to='/register'>Register</Link>
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