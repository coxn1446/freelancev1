import './Blog.css';
import React from 'react';
import {useSelector } from 'react-redux';

import Nav from "../../components/Nav/Nav"
import BlogNav from "../../components/BlogNav/BlogNav"
import Anatomy from "../../components/Posts/Anatomy"
import Jobs from "../../components/Posts/Jobs"
import Collecting from "../../components/Posts/Collecting"
import CommentForm from "../../components/CommentForm/CommentForm"
import CommentRow from "../../components/CommentRow/CommentRow"

import {selectPost} from "../../store/blog/blog.reducer"

const Blog = () => {
  const post = useSelector(selectPost);

  return(
    <div className="gridContainerBlog">
    <Nav></Nav>
    <BlogNav></BlogNav>
    {post === "blogPostAnatomy" ? <Anatomy></Anatomy> : null }
    {post === "blogPostJobs" ? <Jobs></Jobs> : null }
    {post === "blogPostCollecting" ? <Collecting></Collecting> : null }
    <CommentForm post={post}></CommentForm>
    <CommentRow></CommentRow>
    
    </div>
  )
}

export default Blog;