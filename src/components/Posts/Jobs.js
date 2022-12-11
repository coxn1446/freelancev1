import "../../routes/Blog/Blog.css"
import React from 'react';
import Async from "react-async"


const Anatomy = () => {
    let paragraph1 = ""
    let paragraph2 = ""
    let paragraph3 = ""
    let paragraph4 = ""

    const fetchBlog = async () => {
       await fetch(`http://localhost:4000/blog/jobs`, {
            method: 'GET'
        }).then(response => response.text()).then(result => {
                const result1 = result.split("Lil Mart, but it wasn’t even the worst job I had ever had.")
                const result2 = result1[1].split("I thought that was bad, but a year later, it got worse.")
                const result3 = result2[1].split("might be worth it, financially speaking that is.")



                paragraph1 = result1[0].concat('Lil Mart, but it wasn’t even the worst job I had ever had.')
                paragraph2 = result2[0].concat("I thought that was bad, but a year later, it got worse.")
                paragraph3 = result3[0].concat("might be worth it, financially speaking that is.")
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

export default Anatomy;