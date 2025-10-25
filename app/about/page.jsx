import React from 'react'
import Header from '../../Components/Header.jsx'
import Footer from '../../Components/Footer.jsx'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-5 md:px-12 lg:px-24 py-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Sobre
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Bem-vindo ao Blog — um espaço para histórias, ideias e inspiração. Aqui compartilhamos artigos
            pensados para ampliar perspectivas e ajudar você a criar, aprender e crescer.
          </p>
        </div>

        <section className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Nossa missão</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Criar conteúdo de alta qualidade que inspire mudanças positivas. Trabalhamos com autores, especialistas
            e colaboradores para trazer perspectivas autênticas e práticas.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
