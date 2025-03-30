import { Link } from "react-router-dom";
import "./BlogCard.css";
import axios from "axios";

const BlogCard = ({ blog , isEditable}) => {
    function handleDelete(){
        axios.delete(`http://localhost:5000/blogs/${blog._id}`).then((response) => console.log(response))
        .catch((error) => console.error(error));
        window.location.reload();
    }
  return (
    <div className="blog-card">
      {blog.photo && <img src={blog.photo} alt="Blog Cover" />}
      <h3>{blog.title}</h3>
      <p>By {blog?.author?.name}</p>
      <p>{blog.body.substring(0, 100)}...</p>
      <p>{blog.tags.join(",")}</p>
      {isEditable && (
  <div className="action-btns">
    <button className="action-btn delete-btn" onClick={handleDelete}>Delete</button>
    <button className="action-btn edit-btn">
      <Link state={{ blog }} to={`/edit/${blog._id}`} className="btn-link">Edit</Link>
    </button>
  </div>
)}
      <Link state={{blog}} to={`/blogs/${blog._id}`} className="read-more">Read More</Link>
    </div>
  );
};

export default BlogCard;
