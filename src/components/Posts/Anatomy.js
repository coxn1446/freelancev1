import "../../routes/Blog/Blog.css"
import React from 'react';
import Async from "react-async"


const Anatomy = () => {
    let paragraph1 = ""
    let paragraph2 = ""
    let paragraph3 = ""
    let paragraph4 = ""
    let paragraph5 = ""
    let paragraph6 = ""
    let paragraph7 = ""

    const fetchBlog = async () => {
       await fetch(`http://localhost:4000/blog/anatomy`, {
            method: 'GET'
        }).then(response => response.text()).then(result => {
                const result1 = result.split('than our central nervous system.')
                const result2 = result1[1].split("why do you even show up?")
                const result3 = result2[1].split("play lacrosse.")
                const result4 = result3[1].split("English at UMaine.")
                const result5 = result4[1].split("GPA?")
                const result6 = result5[1].split("no. Sorry.")


                paragraph1 = result1[0].concat('than our central nervous system.')
                paragraph2 = result2[0].concat('why do you even show up?"')
                paragraph3 = result3[0].concat('play lacrosse."')
                paragraph4 = result4[0].concat('English at UMaine."')
                paragraph5 = result5[0].concat('GPA?"')
                paragraph6 = result6[0].concat('no. Sorry."')
                paragraph7 = result6[1]
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
                <p className='itemCParagraphBlog'>{paragraph6}</p>
                <p className='itemCParagraphBlog'>{paragraph7}</p>
            </div>
        );
      }}
    </Async>
  )
};

export default Anatomy;