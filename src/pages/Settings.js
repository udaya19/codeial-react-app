import styles from '../styles/settings.module.css'
import { useAuth } from '../hooks/index';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
const Settings = () => {
    const auth = useAuth();
    const [editMode,setEditMode] = useState(false);
    const [name,setName] = useState(auth.user?.name);
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [savingForm,setSavingForm] = useState(false);
    const {addToast} = useToasts();
    const clearForm = () =>{
        setPassword('');
        setConfirmPassword('');
    }
    const updateProfile = async()=>{
        setSavingForm(true);
        let error = false;
        if(!name || !password || !confirmPassword){
            addToast('Please fill all the fields',{
                appearance:'error'
            })
            error = true;
        }
        if(password !== confirmPassword){
            addToast("Password and confirm password must be equal",{
                appearance:'error'
            })
            error = true
        }
        if(error){
            return setSavingForm(false);
        }
        const response = await auth.updateUser(auth.user._id,name,password,confirmPassword);
        if(response.success){
            setEditMode(false);
            setSavingForm(false);
            clearForm();
            return addToast("User updated successfully",{
                appearance:'success'
            })
        }
        else{
            addToast(response.message,{
                appearance:'error'
            })
        }

        setSavingForm(false);
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
                    {auth.user?.email}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldName}>
                    Name
                </div>
                {editMode?
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />:
                <div className={styles.fieldValue}>
                    {auth.user?.email}
                </div>}
            </div>
            {editMode && <>
                <div className={styles.field}>
                    <div className={styles.fieldName}>
                        Password
                    </div>
                    <div className={styles.fieldValue}>
                        <input type='password' value={password} onClick={(e)=>setPassword(e.target.value)} />
                    </div>
                </div>
                <div className={styles.field}>
                    <div className={styles.fieldName}>
                        Confirm Password
                    </div>
                    <div className={styles.fieldValue}>
                        <input type='password' value={confirmPassword} onClick={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                </>}
            
            <div className={styles.btnGrp}>
                { editMode?(<>
                    <button className={`button ${styles.saveBtn}`} onClick={updateProfile} disabled={savingForm}>
                        {savingForm?'Saving Profile...':'Save Profile'}
                    </button>
                    <button className={`button ${styles.editBtn}`} onClick={()=>setEditMode(true)}>
                        Go Back
                    </button>
                </>)
                :
                <button className={`button ${styles.editBtn}`} onClick={()=>setEditMode(true)}>Edit Profile</button> }
            </div>
        </div>
    )
}
export default Settings