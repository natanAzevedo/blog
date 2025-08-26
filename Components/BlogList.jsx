import React, { use } from "react";
import BlogItem from "./BlogItem";
import { useEffect } from "react";
import axios from "axios";

const BlogList = () => {
const [menu,setMenu] =  React.useState("All");
const [blogs, setBlogs] = React.useState([]);
const [loading, setLoading] = React.useState(true);

const fetchBlogs = async () => {
  try {
    setLoading(true);
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs || []);
    console.log(response.data.blogs);
  } catch (error) {
    console.error('Erro ao buscar blogs:', error);
    setBlogs([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchBlogs();
}, []);

const categories = [
  { key: "All", label: "Todos", icon: "📚" },
  { key: "Technology", label: "Tecnologia", icon: "💻" },
  { key: "Startup", label: "Startups", icon: "🚀" },
  { key: "Lifestyle", label: "Estilo de Vida", icon: "🌟" }
];

  return (
    <div className="px-5 md:px-12 lg:px-24 py-12 bg-gray-900 transition-colors duration-300">
      {/* Título da seção */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
          Explore Nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Categorias</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Descubra conteúdo curado especialmente para você em diferentes áreas de conhecimento
        </p>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <button 
            key={category.key}
            className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              menu === category.key 
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105" 
                : "bg-gray-800 text-gray-200 border-2 border-gray-700 hover:border-blue-500 hover:bg-gray-700"
            }`}
            onClick={() => setMenu(category.key)}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.label}</span>
            {menu === category.key && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Grid de blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
        {!loading && blogs.filter(item => menu === "All" ? true : item.category === menu).map((item,index) => {
          return <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} />;
        })}
      </div>

      {/* Estado de carregamento */}
      {loading && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Carregando artigos...</h3>
          <p className="text-gray-300">Aguarde enquanto buscamos o melhor conteúdo para você</p>
        </div>
      )}

      {/* Estado vazio - quando não há posts */}
      {!loading && blogs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Nenhum post encontrado</h3>
          <p className="text-gray-300 mb-6">Ainda não há artigos publicados. Volte em breve para conferir o novo conteúdo!</p>
       
        </div>
      )}

      {/* Estado quando há posts filtrados mas nenhum na categoria selecionada */}
      {!loading && blogs.length > 0 && blogs.filter(item => menu === "All" ? true : item.category === menu).length === 0 && menu !== "All" && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Nenhum post nesta categoria</h3>
          <p className="text-gray-300 mb-6">Não encontramos artigos na categoria "{categories.find(cat => cat.key === menu)?.label}". Tente outra categoria!</p>
          <button 
            onClick={() => setMenu("All")}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Ver Todos os Posts
          </button>
        </div>
      )}

      {/* Botão para ver mais */}
      {!loading && blogs.length > 0 && blogs.filter(item => menu === "All" ? true : item.category === menu).length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg">
            Carregar Mais Artigos
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
