import styles from '../styles/home.module.css';
import PropTypes from 'prop-types'
const Comments = (props) =>{
    return(
        <div className={styles.postCommentsItem}>
                      <div className={styles.postCommentHeader}>
                        <span className={styles.postCommentAuthor}>{props.comment.user.name}</span>
                        <span className={styles.postCommentTime}>a minute ago</span>
                        <span className={styles.postCommentLikes}>22</span>
                      </div>
        
                      <div className={styles.postCommentContent}>{props.comment.content}</div>
                    </div>
    )
}

Comments.propType = {
    comment:PropTypes.array.isRequired
}

export default Comments