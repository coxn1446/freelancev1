import React, {useState} from 'react';
import "./Comment.css"
import likeSelected from "../../../resources/likeselected.png"
import likeDeselected from "../../../resources/likedeselected.png"

const Comment = (props) => {
  

  let username = props.username;
  let date = props.date;
  let text = props.text;
  let hour = props.hour;
  let profilePicURL = props.profilepic;
  const [likeCounter, setlikeCounter] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setlikeCounter(likeCounter + 1)
    setIsLiked(true)
  }

  return (
    <div className='itemEContainerBlog'>
      <img className='itemEABlog' src={profilePicURL}></img>
      <div className='itemEBBlog'>{username} @ {date} {hour}</div>
      <div className='itemECBlog'>{text}</div>
      { isLiked 
        ? <img className='itemEDBlog' src={likeSelected}></img>
        : <img className='itemEDBlog' src={likeDeselected} onClick={handleLike}></img>
      }
      <div className='itemEEBlog'>{likeCounter}</div>
    </div>
  )
}

export default Comment;