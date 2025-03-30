import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./MyBlogs.css";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
  

  useEffect(() => {
    if (!user) {
      console.error("No user ID found! Please log in again.");
      return;
    }
    fetchMyBlogs();
  }, [user]);

  const fetchMyBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/myblogs/${user}`);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching user's blogs:", error.response?.data || error.message);
    }
  };

  return (
    <div className="my-blogs-container">
      <h1>My Blogs</h1>
      {!user? <p>Please log in to view your blogs.</p> : (
        <div className="blogs-grid">
          {blogs.length > 0 ? blogs.map((blog) => <BlogCard isEditable={true} key={blog._id} blog={blog} />) : <p>No blogs found.</p>}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
