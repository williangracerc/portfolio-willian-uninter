// A boa prática é esperar o documento carregar antes de manipular ele!
document.addEventListener('DOMContentLoaded', function() {
    
    // --- FUNCIONALIDADE EXTRA: TEMA CLARO/ESCURO ---
    const btnTema = document.getElementById('btn-tema');
    const body = document.body;

    // Função que faz a alternância
    function toggleTema() {
        // .toggle() adiciona a classe se ela não existe, e remove se ela existe!
        body.classList.toggle('dark-mode'); 
        
        // Salva a preferência do usuário no armazenamento local do navegador
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'escuro');
        } else {
            localStorage.setItem('tema', 'claro');
        }
    }

    // Verifica se o usuário já escolheu um tema antes (ao carregar)
    const temaPreferido = localStorage.getItem('tema');
    if (temaPreferido === 'escuro') {
        body.classList.add('dark-mode');
    }

    // Liga a função ao clique do botão
    if (btnTema) { // Checa se o botão existe antes de tentar ligar o evento
        btnTema.addEventListener('click', toggleTema);
    }

    // --- CÓDIGO DO FORMULÁRIO: VALIDAÇÃO E ENVIO ---
    
    // Pega os elementos do HTML que vamos usar
    const form = document.getElementById('form-contato');
    const statusEnvio = document.getElementById('status-envio');

    // Adiciona o ouvinte para quando o formulário for enviado
    form.addEventListener('submit', function(event) {
        // ESSENCIAL: Impede o envio padrão do formulário
        event.preventDefault(); 
        
        // Pega os valores dos campos
        const nome = document.getElementById('nome').value.trim(); 
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        let temErro = false;
        
        // Validação 1: Checar se os campos estão vazios
        if (nome === '' || email === '' || mensagem === '') {
            alert('🚨 Erro: Por favor, preencha todos os campos obrigatórios!');
            temErro = true;
        }

        // Validação 2: Checar o formato do Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!temErro && !emailRegex.test(email)) {
            alert('🚨 Erro: Por favor, insira um endereço de e-mail válido (ex: usuario@dominio.com).');
            temErro = true;
        }

        // Se NÃO HOUVE ERRO, simular o envio
        if (!temErro) {
            // CORREÇÃO APLICADA: Mensagem de sucesso simples (sem "simulação completa")
            statusEnvio.textContent = '✅ Mensagem enviada com sucesso! Em breve entrarei em contato.';
            statusEnvio.style.display = 'block';
            statusEnvio.style.color = 'green';
            
            // Limpa os campos após a simulação
            form.reset(); 

            // Faz a mensagem de sucesso sumir depois de 5 segundos
            setTimeout(() => {
                statusEnvio.style.display = 'none';
                statusEnvio.textContent = '';
            }, 5000); 
        }
        
    });

});