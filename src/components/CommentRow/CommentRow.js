import React from 'react';
import Async from "react-async"
import "./CommentRow.css"
import Comment from "./Comment/Comment"

const CommentRow = (props) => {
  //pulls in state data from <Blog> component
  const post = props.post;

  //initializes empty array of Comment components
  let commentRows = []

  const fetchComments = async () => {
    //fetches all comments from the database
    await fetch(`http://localhost:4000/comments/${post}`,{
      method: 'GET',
      credentials: "include",
      headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
    }).then((response) => response.json())
    .then(async (data) => {
      //loops through all comments, plugging data into individual <Comment> components' props
      for (let row = 0; row < data.length; row++) {
        await fetch(`http://localhost:4000/users/${data[row].user_id}`,{
          method: 'GET',
          credentials: "include",
          headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }).then((response) => response.json())
        .then( async (data1) => {
          commentRows.push(
            <Comment
              id={row}
              commentid={data[row].id}
              user_id={data[row].user_id}
              username={data1.username}
              text={data[row].text}
              date={data[row].date}
              hour={(data[row].hour).substring(0,5)}
              likes={data[row].num_of_likes}
              profilepic={data1.profilepic}
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
        return (commentRows)
      }}
    </Async>
  )
};

export default CommentRow;