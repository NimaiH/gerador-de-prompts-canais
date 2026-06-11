// Alterna os menus dependendo se o usuário quer Texto ou Thumbnail
function toggleOptions() {
    const goal = document.getElementById('goal').value;
    const networkGroup = document.getElementById('network-group');
    const orientationGroup = document.getElementById('orientation-group');

    if (goal === 'thumbnail') {
        networkGroup.classList.add('hidden');
        orientationGroup.classList.remove('hidden');
    } else {
        networkGroup.classList.remove('hidden');
        orientationGroup.classList.add('hidden');
    }
}

// Gera o prompt baseado nas seleções
function generatePrompt() {
    const channel = document.getElementById('channel').value;
    const subject = document.getElementById('subject').value.trim();
    const goal = document.getElementById('goal').value;
    const network = document.getElementById('network').value;
    const orientation = document.getElementById('orientation').value;

    if (!subject) {
        alert("Por favor, digite o assunto do vídeo/post!");
        return;
    }

    let finalPrompt = "";

    if (goal === 'thumbnail') {
        finalPrompt = `Aja como um Diretor de Arte especialista em conteúdo viral para redes sociais. Crie um prompt detalhado em inglês (para ser usado no Midjourney/DALL-E) para gerar uma thumbnail profissional de alta qualidade.
O nicho do canal é: ${channel}.
O assunto do vídeo é: "${subject}".
Formato da imagem: ${orientation}.
Instruções extras: A imagem deve ser ultra-realista, possuir alto contraste, cores vibrantes, forte apelo emocional/curiosidade para gerar alto CTR (taxa de cliques). O prompt deve incluir termos de iluminação profissional, câmera e estilo artístico.`;
    
    } else {
        // Geração de Textos por Rede Social
        if (network === 'youtube') {
            finalPrompt = `Aja como um especialista de SEO focado no YouTube. O nicho do meu canal é "${channel}" e o assunto do vídeo é: "${subject}".
Crie e entregue o conteúdo abaixo SEPARADO POR TÓPICOS para eu copiar facilmente:
1. Título: 1 linha de título altamente chamativo, com gatilhos mentais e otimizado para busca.
2. Descrição: Descrição detalhada usando palavras-chave relevantes, incluindo hashtags no final.
3. Tags: Uma lista de tags separadas por vírgula (otimizadas para SEO e limites exatos de no máximo 500 caracteres). 
4. Primeiro Comentário: Uma sugestão de primeiro comentário fixado para engajar o público e pedir likes/inscrições.`;
        
        } else if (network === 'tiktok') {
            finalPrompt = `Aja como um especialista em algoritmos de viralização do TikTok. O nicho é "${channel}" e o tema é: "${subject}".
Crie o seguinte conteúdo focado em retenção (Watch Time) e engajamento rápido:
- Um título de 1 linha.
- Uma breve descrição instigante de apenas 1 parágrafo.
- Exatamente 3 hashtags com alto potencial viral para este nicho.
- Uma sugestão de primeiro comentário.
IMPORTANTE: Entregue a resposta com Título, Descrição e Hashtags TUDO JUNTO em um único bloco de texto para que eu possa apenas "Copiar e Colar" direto no app. Entregue o primeiro comentário separado embaixo.`;
        
        } else if (network === 'meta') {
            finalPrompt = `Aja como um Especialista de SEO e Engajamento focado nos algoritmos da Meta (Instagram Reels/Facebook). O nicho é "${channel}" e o tema é: "${subject}".
Crie conteúdo focado em distribuição orgânica e salvamentos:
- Um título de 1 linha.
- Uma breve descrição de 1 parágrafo bem formatado.
- Exatamente 3 hashtags altamente otimizadas para SEO da Meta.
- Uma sugestão de primeiro comentário instigando discussões.
IMPORTANTE: Entregue a resposta com Título, Descrição e Hashtags TUDO JUNTO em um único bloco de texto para eu "Copiar e Colar" rapidamente. Entregue o primeiro comentário separado embaixo.`;
        }
    }

    // Insere o resultado na tela
    document.getElementById('result').value = finalPrompt;
}

// Função para copiar o texto com feedback visual
function copyToClipboard() {
    const resultBox = document.getElementById('result');
    if (!resultBox.value) return;

    resultBox.select();
    navigator.clipboard.writeText(resultBox.value).then(() => {
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copiado! ✓";
        copyBtn.style.backgroundColor = "#059669";
        
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = "#10b981";
        }, 2000);
    });
}