'use client'
import React from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../Assets/assets";
import { useSearchParams } from 'next/navigation';

const EditBlog = () => {
    const [image, setImage] = React.useState(null);
    const [data, setData] = React.useState({
        title: "",
        description: "",
        category: "Projeto",
        author: "Adm",
        authorImg: ""
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [blogId, setBlogId] = React.useState(null);
    const [currentImageUrl, setCurrentImageUrl] = React.useState("");

    const searchParams = useSearchParams();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const fetchBlogData = async (id) => {
        try {
            const response = await axios.get(`/api/blog?id=${id}`);
            if (response.data.blog) {
                const blog = response.data.blog;
                setData({
                    title: blog.title,
                    description: blog.description,
                    category: blog.category,
                    author: blog.author,
                    authorImg: blog.authorImg || ""
                });
                setCurrentImageUrl(blog.image);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Erro ao buscar blog:', error);
            toast.error("Erro ao carregar dados do blog");
            setIsLoading(false);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('authorImg', data.authorImg || "");
            
            // Se uma nova imagem foi selecionada, inclui ela
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.put('/api/blog', {
                id: blogId,
                title: data.title,
                description: data.description,
                category: data.category,
                author: data.author,
                authorImg: data.authorImg || "",
                // Se uma nova imagem foi selecionada, ela será processada separadamente
                ...(image && { newImage: true })
            });

            if (response.data.success) {
                toast.success(response.data.msg);
            } else {
                toast.error("Erro ao atualizar blog");
            }
        } catch (error) {
            console.error('Erro:', error);
            toast.error("Erro ao atualizar blog");
        }
    };

    React.useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setBlogId(id);
            fetchBlogData(id);
        } else {
            toast.error("ID do blog não encontrado");
            setIsLoading(false);
        }
    }, [searchParams]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-200">Carregando...</p>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
                
                {/* Campo de upload de imagem */}
                <div>
                    <p className="text-xl text-gray-200">Imagem Atual / Nova Imagem</p>
                    <label htmlFor="image" className="cursor-pointer">
                        <Image 
                            className="mt-4 border border-gray-600 rounded" 
                            src={image ? URL.createObjectURL(image) : (currentImageUrl || assets.upload_area)} 
                            alt="Thumbnail" 
                            width={140} 
                            height={70} 
                        />
                    </label>
                    <input 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file" 
                        id="image" 
                        hidden 
                        accept="image/*"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                        Deixe em branco para manter a imagem atual
                    </p>
                </div>

                <p className="text-xl mt-6 text-gray-200">Título do Blog</p>
                <input 
                    name="title" 
                    onChange={onChangeHandler} 
                    value={data.title} 
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border bg-gray-800 text-gray-200 border-gray-600" 
                    type="text" 
                    placeholder="Digite o título aqui" 
                    required
                />

                <p className="text-xl mt-4 text-gray-200">Descrição do Blog</p>
                <textarea 
                    name="description" 
                    onChange={onChangeHandler} 
                    value={data.description} 
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border bg-gray-800 text-gray-200 border-gray-600" 
                    placeholder="Escreva o conteúdo aqui" 
                    rows={6} 
                    required
                />

                <p className="text-xl mt-4 text-gray-200">Categoria do Blog</p>
                <select 
                    name="category" 
                    onChange={onChangeHandler} 
                    value={data.category} 
                    className="w-40 mt-4 px-4 py-3 border bg-gray-800 text-gray-200 border-gray-600"
                >
                    <option value="Projeto">Projeto</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Estilo de Vida">Estilo de Vida</option>
                </select>

                <br />
                <button 
                    type="submit" 
                    className="mt-8 w-40 h-12 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200"
                >
                    ATUALIZAR
                </button>
            </form>
        </>
    );
};

export default EditBlog;