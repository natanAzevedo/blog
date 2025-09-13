/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts'],
      '.jsx': ['.jsx', '.tsx'],
    };
    return config;
  },
  
  async redirects() {
    // Em produção, redireciona todas as rotas admin para a home
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/admin/:path*',
          destination: '/',
          permanent: false,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
