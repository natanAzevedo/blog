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
    const [isUpdating, setIsUpdating] = React.useState(false);
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
            console.log('Buscando dados do blog com ID:', id);
            const response = await axios.get(`/api/blog?id=${id}`);
            console.log('Resposta do servidor:', response.data);
            
            if (response.data.blog) {
                const blog = response.data.blog;
                console.log('Blog encontrado:', blog);
                
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
        
        if (isUpdating) return; // Previne múltiplos submits
        
        try {
            setIsUpdating(true);
            
            // Se há uma nova imagem, usar FormData para upload
            if (image) {
                console.log('Nova imagem detectada, usando FormData para upload');
                
                const formData = new FormData();
                formData.append('id', blogId);
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('category', data.category);
                formData.append('author', data.author);
                formData.append('authorImg', data.authorImg || "");
                formData.append('image', image);
                formData.append('updateImage', 'true'); // Flag para indicar atualização de imagem
                
                console.log('Enviando FormData com nova imagem');
                
                const response = await axios.put('/api/blog', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                console.log('Resposta do servidor:', response.data);
                
                if (response.data.success) {
                    toast.success(response.data.msg);
                    setImage(null); // Limpar imagem selecionada
                    // Recarregar os dados do blog para mostrar as mudanças
                    await fetchBlogData(blogId);
                } else {
                    toast.error(response.data.error || "Erro ao atualizar blog");
                }
            } else {
                console.log('Sem nova imagem, usando JSON para update');
                
                // Preparar dados para envio (sem imagem)
                const updateData = {
                    id: blogId,
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    author: data.author,
                    authorImg: data.authorImg || ""
                };

                console.log('Enviando dados para update:', updateData);

                const response = await axios.put('/api/blog', updateData);

                console.log('Resposta do servidor:', response.data);

                if (response.data.success) {
                    toast.success(response.data.msg);
                    // Recarregar os dados do blog para mostrar as mudanças
                    await fetchBlogData(blogId);
                } else {
                    toast.error(response.data.error || "Erro ao atualizar blog");
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            toast.error(error.response?.data?.error || "Erro ao atualizar blog");
        } finally {
            setIsUpdating(false);
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
                    <p className="text-xl text-gray-200">
                        {image ? "Nova Imagem Selecionada" : "Imagem Atual"}
                    </p>
                    <label htmlFor="image" className="cursor-pointer block">
                        <div className="relative">
                            <Image 
                                className="mt-4 border border-gray-600 rounded" 
                                src={image ? URL.createObjectURL(image) : (currentImageUrl || assets.upload_area)} 
                                alt="Thumbnail" 
                                width={140} 
                                height={70} 
                            />
                            {image && (
                                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                    NOVA
                                </div>
                            )}
                        </div>
                    </label>
                    <input 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file" 
                        id="image" 
                        hidden 
                        accept="image/*"
                    />
                    <div className="mt-2">
                        <p className="text-sm text-gray-400">
                            {image ? 
                                `Nova imagem selecionada: ${image.name}` : 
                                "Clique na imagem para substituir"
                            }
                        </p>
                        {image && (
                            <button
                                type="button"
                                onClick={() => setImage(null)}
                                className="text-sm text-red-400 hover:text-red-300 mt-1"
                            >
                                Cancelar nova imagem
                            </button>
                        )}
                    </div>
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
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border bg-gray-800 text-gray-200 border-gray-600 whitespace-pre-wrap" 
                    placeholder="Escreva o conteúdo aqui&#10;&#10;Use quebras de linha para separar parágrafos.&#10;A formatação será preservada." 
                    rows={10} 
                    style={{whiteSpace: 'pre-wrap', resize: 'vertical'}}
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
                    disabled={isUpdating}
                    className={`mt-8 w-40 h-12 text-white rounded transition-colors duration-200 ${
                        isUpdating 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {isUpdating ? 'ATUALIZANDO...' : 'ATUALIZAR'}
                </button>
            </form>
        </>
    );
};

export default EditBlog;