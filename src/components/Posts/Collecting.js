import "../../routes/Blog/Blog.css"
import React from 'react';
import Async from "react-async"


const Collecting = () => {
    let paragraph1 = ""
    let paragraph2 = ""
    let paragraph3 = ""
    let paragraph4 = ""

    const fetchBlog = async () => {
       await fetch(`http://localhost:4000/blog/collecting`, {
            method: 'GET'
        }).then(response => response.text()).then(result => {
                const result1 = result.split("challenged me to collect more.")
                const result2 = result1[1].split("my progress or concerning lack thereof.")
                const result3 = result2[1].split("a reminder the voice in my head is wrong.")



                paragraph1 = result1[0].concat('challenged me to collect more.')
                paragraph2 = result2[0].concat("my progress or concerning lack thereof.")
                paragraph3 = result3[0].concat("a reminder the voice in my head is wrong.")
                paragraph4 = result3[1]
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
            </div>
        );
      }}
    </Async>
  )
};

export default Collecting;