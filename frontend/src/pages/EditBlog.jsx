import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditBlog.css";

const EditBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({ title: "", body: "", tags: [""] , photo: ""});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setBlog({ ...blog, tags: value.split(",").map((tag) => tag.trim()) });
    } else {
      setBlog({ ...blog, [name]: value });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/blogs/${blogId}`, blog);
      navigate("/myblogs");
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  return (
    <div className="edit-blog-container">
      <h1>Edit Blog</h1>
      <form className="blog-form" onSubmit={handleSubmit}>
      <input type="text" name="photo" placeholder="Photo" value={blog.photo} onChange={handleChange} />
        <input type="text" name="title" placeholder="Title" value={blog.title} onChange={handleChange} />
        <textarea name="body" placeholder="Body" value={blog.body} onChange={handleChange} />
        <input type="text" name="tags" placeholder="Tags (comma separated)" value={blog.tags} onChange={handleChange} />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
