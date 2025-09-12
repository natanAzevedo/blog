'use client'
import React from "react";
import Image from "next/image";
import { assets } from "../../../Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {

    const [image, setImage] = React.useState(null);
    const [imageMode, setImageMode] = React.useState('upload'); // 'upload' ou 'url'
    const [data, setData] = React.useState({
        title: "",
        description: "",
        category: "Startup",
        author:"Alex Bennett",
        authorImg:"/profile_icon.png",
        imageUrl: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
        console.log(data);
    }   

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        // Validação básica
        if (!data.title || !data.description) {
            toast.error("Por favor, preencha todos os campos obrigatórios");
            return;
        }
        
        if (imageMode === 'upload' && !image) {
            toast.error("Por favor, selecione uma imagem");
            return;
        }
        
        if (imageMode === 'url' && !data.imageUrl) {
            toast.error("Por favor, insira uma URL de imagem");
            return;
        }
        
        try {
            let response;
            
            if (imageMode === 'upload') {
                // Enviar via FormData para upload de arquivo
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('category', data.category);
                formData.append('author', data.author);
                formData.append('authorImg', data.authorImg);
                formData.append('image', image);
                
                response = await axios.post('/api/blog', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Enviar via JSON para URL
                const jsonData = {
                    ...data,
                    image: data.imageUrl
                };
                
                response = await axios.post('/api/blog', jsonData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            
            if (response.data.success) {
                toast.success(response.data.msg);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Alex Bennett",
                    authorImg: "/profile_icon.png",
                    imageUrl: ""
                });
                setImage(null);
            } else {
                toast.error("Erro ao adicionar blog");
            }
        } catch (error) {
            console.error('Erro:', error);
            toast.error("Erro ao enviar dados");
        }
    };

    return (
        <>
          <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
            
            {/* Seletor de modo de imagem */}
            <div className="mb-6">
                <p className="text-xl text-gray-200 mb-4">Como deseja adicionar a imagem?</p>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setImageMode('upload')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            imageMode === 'upload' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Upload do PC
                    </button>
                    <button
                        type="button"
                        onClick={() => setImageMode('url')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            imageMode === 'url' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        URL da Internet
                    </button>
                </div>
            </div>

            {/* Campo de imagem baseado no modo */}
            {imageMode === 'upload' ? (
                <div>
                    <p className="text-xl text-gray-200">Upload da Imagem</p>
                    <label htmlFor="image" className="cursor-pointer">
                        <Image 
                            className="mt-4 border border-gray-600 rounded" 
                            src={!image ? assets.upload_area : URL.createObjectURL(image)} 
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
                        required
                    />
                    <p className="text-sm text-gray-400 mt-2">
                        A imagem será convertida para Base64 e salva no banco de dados
                    </p>
                </div>
            ) : (
                <div>
                    <p className="text-xl text-gray-200">URL da Imagem</p>
                    <input 
                        name="imageUrl" 
                        onChange={onChangeHandler} 
                        value={data.imageUrl} 
                        className="w-full sm:w-[500px] mt-4 px-4 py-3 border bg-gray-800 text-gray-200 border-gray-600" 
                        type="url" 
                        placeholder="https://exemplo.com/imagem.jpg" 
                        required
                    />
                    {data.imageUrl && (
                        <div className="mt-4">
                            <p className="text-gray-400 mb-2">Preview da imagem:</p>
                            <Image 
                                src={data.imageUrl} 
                                alt="Preview" 
                                width={140} 
                                height={70} 
                                className="border border-gray-600 rounded"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                </div>
            )}

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
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <br />
            <button 
                type="submit" 
                className="mt-8 w-40 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
            >
                ADICIONAR
            </button>
            </form> 
        </>
    );
};

export default page;
