import mongoose from "mongoose";

// É uma boa prática dar um nome específico para o seu schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    authorImg: { type: String, required: false, default: "" },
    date: { type: Date, default: Date.now },
});

// Forçar a recriação do modelo removendo o cache
if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
}

// A linha corrigida: use "Blog" nos dois lugares.
const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;