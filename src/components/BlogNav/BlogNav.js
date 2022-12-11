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
      <div className="itemBContainerBlog">
          <button className="itemBA" id="blogPostAnatomy" onClick={handleSelectPost}>Anatomy</button>
          <button className="itemBA" id="blogPostWind" onClick={handleSelectPost}>Wind</button>
          <button className="itemBA" id="blogPostJobs" onClick={handleSelectPost}>Jobs</button>
          <button className="itemBA" id="blogPostCollecting" onClick={handleSelectPost}>Collecting</button>
      </div>
  );
}

export default BlogNav;