import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/search?query=${searchQuery}`);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>All Blogs</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search blogs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={searchQuery?handleSearch:fetchBlogs}>Search</button>
      </div>
      <div className="blogs-grid">
        {blogs.length > 0 ? blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />) : <p>No blogs found.</p>}
      </div>
    </div>
  );
};

export default Home;
