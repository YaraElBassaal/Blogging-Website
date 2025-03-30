import React from 'react'
import { useLocation } from 'react-router-dom'
import "../components/BlogCard.css";

function BlogDetail() {
    const location = useLocation().state.blog
  return (
    <div>
      <div className="blog-card">
      {location.photo && <img src={location.photo} alt="location Cover" />}
      <h3>{location.title}</h3>
      <p>By {location?.author?.name}</p>
      <p>{location.body.substring(0, 100)}...</p>
      <p>{location.tags.join(",")}</p>
    </div>
    </div>
  )
}

export default BlogDetail
