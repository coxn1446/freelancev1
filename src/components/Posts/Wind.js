import "../../routes/Blog/Blog.css"
import React from 'react';
import Async from "react-async"


const Wind = () => {
  //initializes paragraph variables
  let paragraph1 = ""
  let paragraph2 = ""
  let paragraph3 = ""
  let paragraph4 = ""
  let paragraph5 = ""

  //pulls paragraphs from database and sets them to variables outside the function
  const fetchBlog = async () => {
      await fetch(`/blog/wind`, {
          method: 'GET'
      }).then(response => response.json()).then(result => {
        paragraph1 = result.paragraph1
        paragraph2 = result.paragraph2
        paragraph3 = result.paragraph3
        paragraph4 = result.paragraph4
        paragraph5 = result.paragraph5
      })
  }

  return(
    <Async promiseFn={fetchBlog}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        return (
          <div className='itemCBlog'>
            <p className='itemCParagraphBlog'>{paragraph1}</p>
            <p className='itemCParagraphBlog'>{paragraph2}</p>
            <p className='itemCParagraphBlog'>{paragraph3}</p>
            <p className='itemCParagraphBlog'>{paragraph4}</p>
            <p className='itemCParagraphBlog'>{paragraph5}</p>
          </div>
        );
      }}
    </Async>
  )
};

export default Wind;