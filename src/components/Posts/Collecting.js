import "../../routes/Blog/Blog.css"
import React from 'react';
import Async from "react-async"


const Collecting = () => {
    //initializes paragraph variables
    let paragraph1 = ""
    let paragraph2 = ""
    let paragraph3b = ""
    let paragraph3c = ""
    let paragraph4 = ""

    //pulls paragraphs from database and sets them to variables outside the function
    const fetchBlog = async () => {
      await fetch(`/blog/collecting`, {
          method: 'GET'
      }).then(response => response.json()).then(result => {
        paragraph1 = result.paragraph1
        paragraph2 = result.paragraph2
        const paragraph3a = result.paragraph3.split('collection of completed projects.')
        paragraph3b = paragraph3a[0]
        paragraph3c = paragraph3a[1]
        paragraph4 = result.paragraph4
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
                <p className='itemCParagraphBlog'>{paragraph3b}<a href="https://coxnswebsite.surge.sh/">collection of completed projects.</a>{paragraph3c}</p>
                <p className='itemCParagraphBlog'>{paragraph4}</p>
            </div>
        );
      }}
    </Async>
  )
};

export default Collecting;