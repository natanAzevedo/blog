import React from 'react'
import Header from '../../Components/Header.jsx'
import Footer from '../../Components/Footer.jsx'



export default function Page(){
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-5 md:px-12 lg:px-24 py-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contato</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Tem alguma pergunta, sugestão ou gostaria de colaborar? Envie uma mensagem — responderemos o mais rápido possível.</p>
        </div>

        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
          <form className="space-y-4" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
              <input className="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3" type="text" name="name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input className="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3" type="email" name="email" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensagem</label>
              <textarea className="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3" name="message" rows={6} />
            </div>

            <div className="text-right">
              <button type="submit" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">Enviar</button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}
