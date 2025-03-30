import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";

const CreateBlog = () => {
  const [blog, setBlog] = useState({ title: "", body: "", tags: [""] , photo: ""});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");


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
      await axios.post("http://localhost:5000/blogs", {...blog, author: userId});
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="create-blog-container">
      <h1>Create a Blog</h1>
      <form className="blog-form" onSubmit={handleSubmit}>
        <input type="text" name="photo" placeholder="Photo" value={blog.photo} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={blog.title} onChange={handleChange} required />
        <textarea name="body" placeholder="Body" value={blog.body} onChange={handleChange} required />
        <input type="text" name="tags" placeholder="Tags (comma separated)" value={blog.tags} onChange={handleChange} />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
