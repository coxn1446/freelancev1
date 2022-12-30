import './Blog.css';
import React, {useState, useMemo} from 'react';
import {useSelector } from 'react-redux';

//Components
import Nav from "../../components/Nav/Nav"
import BlogNav from "../../components/BlogNav/BlogNav"
import CommentForm from "../../components/CommentForm/CommentForm"
import TopCommentRow from "../../components/CommentRow/TopCommentRow"
import CommentRow from "../../components/CommentRow/CommentRow"

//Blog Posts
import Anatomy from "../../components/Posts/Anatomy"
import Jobs from "../../components/Posts/Jobs"
import Collecting from "../../components/Posts/Collecting"
import Wind from "../../components/Posts/Wind"

import {selectPost} from "../../store/blog/blog.reducer"

const Blog = () => {
  //state variables
  const post = useSelector(selectPost);
  const [isPostSelected, setIsPostSelected] = useState(false);


  //checks if any blog is selected
  useMemo(() => {
    if(post !== "None") {
      setIsPostSelected(true)
    }
  }, [post])



  return(
    <div className="gridContainerBlog">
    <Nav></Nav>
    <BlogNav></BlogNav>
    {post === "blogPostAnatomy" ? <Anatomy></Anatomy> : null }
    {post === "blogPostJobs" ? <Jobs></Jobs> : null }
    {post === "blogPostCollecting" ? <Collecting></Collecting> : null }
    {post === "blogPostWind" ? <Wind></Wind> : null }
    { isPostSelected 
      ? <div className="itemGContainerBlog">
          <CommentForm post={post}></CommentForm>
          <p className='paragraphBlog'>Top comments</p>
          <TopCommentRow post={post}></TopCommentRow>
          <p className='paragraphBlog'>Recent comments</p>
          <CommentRow post={post}></CommentRow>
        </div>
      : <div className="itemFContainerBlog">
          <p className="itemFA">I have been working on these short stories for a few years, fairly confident that whole time I was never going to share them with anyone. I wrote them just because I like to write. There are a few more I might publish; if you'd like to be notified when/if I do, please leave your email below.</p>
          <form className="itemFB" method='POST' action="/users/subscribe?_method=PUT" id="form3">
            <input form="form3" type="email" id="emailSubscribeBlog" name="emailSubscribeBlog" required></input>
            <button type="submit" form="form3">Subscribe</button>
          </form>
        </div>

    }
    
    </div>
  )
}

export default Blog;