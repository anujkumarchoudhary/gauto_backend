import Blog from "../model/blog.model.js";

export const createBlog = async (req, res) => {
  const data = req.body || {};
  const { title } = data;

  try {
    const blog = await Blog.findOne({ title });
    if (blog) {
      return res.status(409).json({
        status: "error",
        message: "This blog already exit!",
        data: blog,
      });
    }
    const imageUrl = req.file ? req.file.path : null;

    const newBlog = new Blog({
      title,
      ...data,
      image: imageUrl,
    });
    await newBlog.save();
    return res.status(201).json({
      status: "success",
      message: "Blog created successfully!",
      data: newBlog,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId");

    res.status(200).json({
      status: "success",
      message: "Retrieve all blogs successfully!",
      data: blogs,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found!" });
    }

    res.status(200).json({
      status: "success",
      message: "Retrieve a blog successfully!",
      data: blog,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateBlog = async (req, res) => {
  const data = req.body || {};
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found!",
        data: blog,
      });
    }
    const imageUrl = req.file ? req.file.path : null;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...data,
        image: imageUrl,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      message: "Blog updated successfully!",
      data: updatedBlog,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found!",
        data: blog,
      });
    }

    const deletedBLog = await Blog.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Blog deleted successfully!",
      data: deletedBLog,
    });
  } catch (error) {
    console.log("Error", error);
  }
};
