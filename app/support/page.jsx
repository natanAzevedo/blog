import React from 'react'
import Header from '../../Components/Header.jsx'
import Footer from '../../Components/Footer.jsx'

export default function Page(){
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-5 md:px-12 lg:px-24 py-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Suporte</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Precisa de ajuda técnica ou tem dúvidas sobre algum artigo? Nossa equipe de suporte está disponível para ajudar.</p>
        </div>

        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Como podemos ajudar?</h2>
          <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Ajuda com upload de conteúdo ou imagens</li>
            <li>Relatar bugs ou problemas no site</li>
            <li>Temas de colaboração e parcerias</li>
          </ul>

          <div className="mt-6">
            <p className="text-gray-600 dark:text-gray-300">Email de suporte: <a href="mailto:support@example.com" className="text-blue-600 dark:text-blue-400">support@example.com</a></p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Ou use o formulário em <a href="/contact" className="text-blue-600 dark:text-blue-400">Contato</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
