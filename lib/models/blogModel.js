import mongoose from "mongoose";

// É uma boa prática dar um nome específico para o seu schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    authorImg: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

// A linha corrigida: use "Blog" nos dois lugares.
const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default BlogModel;