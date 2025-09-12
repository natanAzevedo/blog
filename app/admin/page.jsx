import React from 'react';

const AdminPage = () => {
    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
            <h1 className="text-2xl font-bold text-gray-200 mb-6">Painel Administrativo</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Gerenciar Blogs</h3>
                    <p className="text-gray-400 text-sm">Adicione, edite ou remova posts do blog.</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Lista de Posts</h3>
                    <p className="text-gray-400 text-sm">Visualize e gerencie todos os posts publicados.</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Inscrições</h3>
                    <p className="text-gray-400 text-sm">Gerencie as inscrições de email dos usuários.</p>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;