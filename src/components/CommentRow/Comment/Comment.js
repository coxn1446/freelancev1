import React, {useState, useMemo} from 'react';
import Async from "react-async";
import { useOutletContext} from "react-router-dom";
import "./Comment.css"
import likeSelected from "../../../resources/likeselected.png"
import likeDeselected from "../../../resources/likedeselected.png"
import deleteButton from "../../../resources/errorX.png"

const Comment = (props) => {
  //lets me see user_id as stored in the cookie
  const [userData] = useOutletContext();

  //initalizes prop variables from <CommentRow> component
  let commentID = props.commentid;
  let userID = props.user_id;
  let username = props.username;
  let date = props.date;
  let text = props.text;
  let hour = props.hour;
  let profilePicURL = props.profilepic;

  //variables used for aesthetics, conditonal rendering below
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [userIDCheck, setUserIDCheck] = useState(false);
  const [displaySwitch, setDisplaySwitch] = useState("grid");

  //compares userID from cookie to user_ID in comments table to produce a true/false value that will be used in a JSX ternary statement below
  useMemo(() => {
    if(Number(userID) === userData.passport.user.id) {
      setUserIDCheck(true)
    }
  }, [userIDCheck])

  const handleLike = async () => {
    //Adds a like to the database
    await fetch(`/likes/${commentID}`,{
      method: 'POST',
      credentials: "include",
      headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}})
    
    //Edits the number of likes associated with a comment  
    await fetch(`/comments/like/${commentID}`,{
      method: 'PUT',
      credentials: "include",
      headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}})
      //changes like status aesthetically
      setIsLiked(true)
      setLikes(likes + 1)
  }

  const handleUnlike = async () => {
    //Deletes a like from the database
    await fetch(`/likes/${commentID}`,{
      method: 'DELETE',
      credentials: "include",
      headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}})
    
    //Edits the number of likes associated with a comment  
    await fetch(`/comments/unlike/${commentID}`,{
      method: 'PUT',
      credentials: "include",
      headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}})
      //changes like status aesthetically
      setIsLiked(false)
      setLikes(likes - 1)
  }

  //searches for the userId in the cookie within a "who has liked what" table. If the userID appears next to the comment
  //ID in the database, that means this user has "liked" this comment and the thumbs up sign will render as such
  const checkIsLiked = async () => {
    await fetch(`/likes/${commentID}`,{
          method: 'GET',
          credentials: "include",
          headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
    }).then((response) => response.json())
    .then( async (data) => {
      for (let row = 0; row < data.length; row++) {
        for (const property in data[row]) {
          if(userData.passport.user.id === Number(data[row][property])) {
            setIsLiked(true)
          }
        }
      }
    })
  }



  //Takes commentID from props, and then deletes data associated with that ID in the database
  const handleDeleteComment = async () => {
    await fetch(`/comments/${commentID}`,{
      method: 'DELETE',
      headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',}
    }).then(() => {
      //remove comment aesthetically
       setDisplaySwitch('none')
    })
  }

  return(
    <Async promiseFn={checkIsLiked}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        return (
          <div style={{display: displaySwitch}}className='itemEContainerBlog'>
            <img className='itemEABlog' src={profilePicURL}></img>
            <div className='itemEBBlog'>{username} @ {date} {hour}</div>
            <div className='itemECBlog'>{text}</div>
            { userIDCheck
              ? <img className='itemEDBlog' src={deleteButton} onClick={handleDeleteComment}></img>
              : null
            }
            { isLiked 
              ? <img className='itemEEBlog' src={likeSelected} onClick={handleUnlike}></img>
              : <img className='itemEEBlog' src={likeDeselected} onClick={handleLike}></img>
            }
            <div className='itemEFBlog'>{likes}</div>
          </div>
        )
      }}
    </Async>
  )
};

export default Comment;