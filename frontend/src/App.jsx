import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetail from "./pages/BlogDetail";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:blogId" element={<EditBlog />} />
          <Route path="/blogs/:blogId" element={<BlogDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
