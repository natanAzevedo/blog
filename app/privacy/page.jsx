import React from 'react'
import Header from '../../Components/Header.jsx'
import Footer from '../../Components/Footer.jsx'

export default function Page(){
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-5 md:px-12 lg:px-24 py-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Política de Privacidade</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Protegemos suas informações e explicamos claramente como elas são usadas.</p>
        </div>

        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Coleta de dados</h2>
          <p className="text-gray-600 dark:text-gray-300">Coletamos apenas as informações necessárias para fornecer e melhorar nossos serviços. Dados de contato e conteúdo fornecido por autores são armazenados com segurança.</p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Uso de cookies</h2>
          <p className="text-gray-600 dark:text-gray-300">Utilizamos cookies para melhorar a experiência do usuário; você pode desativá-los no seu navegador.</p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Contato</h2>
          <p className="text-gray-600 dark:text-gray-300">Se tiver dúvidas sobre privacidade, entre em contato: <a href="mailto:privacy@example.com" className="text-blue-600 dark:text-blue-400">privacy@example.com</a></p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
