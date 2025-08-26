'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { assets } from '../../../Assets/assets';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Verifica se está em produção e bloqueia
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            router.push('/');
            return;
        }
    }, [router]);

    // Credenciais simples para desenvolvimento local
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Verifica as credenciais
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                // Define o token de autenticação (cookie)
                document.cookie = 'admin-token=admin123; path=/; max-age=86400'; // 24 horas
                
                toast.success('Login realizado com sucesso!');
                router.push('/admin');
            } else {
                toast.error('Credenciais inválidas!');
            }
        } catch (error) {
            toast.error('Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    // Se estiver em produção, não renderiza nada
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Image 
                        src={assets.logo} 
                        alt="Logo" 
                        width={120} 
                        height={40} 
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-3xl font-bold text-white">
                        Acesso Administrativo
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Entre com suas credenciais para acessar o painel admin
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                                Usuário
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Digite seu usuário"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Digite sua senha"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                loading 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            } transition-colors duration-200`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Entrando...
                                </span>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </div>
                </form>
                
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Credenciais de teste: admin / admin123
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
