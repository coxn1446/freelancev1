import './CommentForm.css';
import React from 'react';

const CommentForm = (props) => {
  //pulls in state data from <Blog> component
  const post = props.post;
  
  return (
      <div className="itemDContainerBlog">
          <form className="blogCommentForm" method='post' action="/comments" id="form2">
            <input form="form2" type="text" id="commentBlog" name="commentBlog"></input>
            <input type="hidden" form="form2" id="postBlog" name="postBlog" value={post} ></input>
            <button type="submit" form="form2" id="submitBlog">Post Comment</button>
        </form>
      </div>
  );
}

export default CommentForm;