import React from 'react';
import Async from "react-async"
import "./CommentRow.css"
import Comment from "./Comment/Comment"

const CommentRow = (props) => {
  //pulls in state data from <Blog> component
  const post = props.post;

  //initializes empty array of Comment components
  let CommentRows = []

  const fetchComments = async () => {
    //fetches all comments from the database
    await fetch(`/comments/${post}`,{
      method: 'GET',
      credentials: "include",
      headers: {'Access-Control-Allow-Origin': ['http://localhost:3000', 'https://www.freelancev1.com']}
    }).then((response) => response.json())
    .then(async (data) => {
      //sorts through all comments and orders them chronologically
      let data1 = data.sort((a, b) => b.id - a.id)
      //loops through top three comments, plugging data into individual <Comment> components' props
      for (let row = 0; row < data1.length; row++) {
        await fetch(`/users/${data1[row].user_id}`,{
          method: 'GET',
          credentials: "include",
          headers: {'Access-Control-Allow-Origin': ['http://localhost:3000', 'https://www.freelancev1.com']}
        }).then((response) => response.json())
        .then( async (data2) => {
          CommentRows.push(
            <Comment
              id={row}
              commentid={data[row].id}
              user_id={data[row].user_id}
              username={data2.username}
              text={data[row].text}
              date={data[row].date}
              hour={(data[row].hour).substring(0,5)}
              likes={data[row].num_of_likes}
              profilepic={data2.profilepic}
            ></Comment>
          )
        })
      } 
    })
  }

  return(
    <Async promiseFn={fetchComments}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        return (CommentRows.sort((a, b) => b.props.commentid - a.props.commentid))
      }}
    </Async>
  )
};

export default CommentRow;