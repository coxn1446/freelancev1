import './BlogNav.css';
import React from 'react';
import { useDispatch} from 'react-redux';

const BlogNav = () => {
  const dispatch = useDispatch()

  const handleSelectPost = (e) => {
    dispatch({
      type: "blog/selectPost",
      target: e.target.id
    })
  }
  
  return (
      <div className="itemBContainerBlogNav">
          <button className="itemBABlogNav" id="blogPostAnatomy" onClick={handleSelectPost}>Anatomy</button>
          <button className="itemBABlogNav" id="blogPostWind" onClick={handleSelectPost}>Wind</button>
          <button className="itemBABlogNav" id="blogPostJobs" onClick={handleSelectPost}>Jobs</button>
          <button className="itemBABlogNav" id="blogPostCollecting" onClick={handleSelectPost}>Collecting</button>
      </div>
  );
}

export default BlogNav;