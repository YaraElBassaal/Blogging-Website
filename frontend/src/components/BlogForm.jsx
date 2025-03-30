const BlogForm = ({ blogData, handleChange, handleSubmit }) => {
    return (
      <form className="blog-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={blogData.title} onChange={handleChange} required />
        <textarea name="body" placeholder="Body" value={blogData.body} onChange={handleChange} required />
        <input type="text" name="tags" placeholder="Tags (comma separated)" value={blogData.tags} onChange={handleChange} />
        <input type="file" name="photo" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default BlogForm;
  