import React from 'react';
import Async from "react-async"
import "./CommentRow.css"
import Comment from "./Comment/Comment"

const CommentRow = () => {
    let commentRows = []


  const fetchComments = async () => {
      await fetch(`http://localhost:4000/comments/`,{
          method: 'GET',
          credentials: "include",
          headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
      }).then((response) => response.json())
      .then(async (data) => {
        for (let row = 0; row < data.length; row++) {
          let profilepicURL = ""
          await fetch(`http://localhost:4000/users/${data[row].username}`,{
            method: 'GET',
            credentials: "include",
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}}
            ).then((response) => response.json())
            .then((data1) => {profilepicURL = data1.profilepic})
            commentRows.push(
                <Comment
                    username={data[row].username}
                    text={data[row].text}
                    date={data[row].date}
                    hour={(data[row].hour).substring(0,5)}
                    profilepic={profilepicURL}
                ></Comment>
            )
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