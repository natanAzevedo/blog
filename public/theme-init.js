// Script para inicializar o tema antes da renderização
(function() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const root = document.documentElement;
    
    // Remove classes conflitantes
    root.classList.remove('dark', 'light');
    
    // Aplica o tema salvo
    root.classList.add(savedTheme);
    
    // Debug
    console.log('Tema aplicado:', savedTheme);
  } catch (error) {
    console.error('Erro ao inicializar tema:', error);
    // Fallback para tema claro
    document.documentElement.classList.add('light');
  }
})();
