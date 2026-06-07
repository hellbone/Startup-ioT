# @mnésia_Lab's APPs & Force Safe IoT Mobile Security

Este projeto foi estruturado especificamente para ser **distribuído e implantado diretamente na Vercel** de forma simples, integrando o frontend SPA em **Vite (React + TypeScript)** com um backend serverless moderno rodando em **Vercel Serverless Functions**.

---

## 🚀 Guia Rápido de Deploy na Vercel

Siga o passo a passo abaixo para colocar esta aplicação no ar com segurança e funcionalidade total da Inteligência Artificial:

### 1. Importar o Repositório no Painel da Vercel
1. Acesse o [Painel da Vercel](https://vercel.com/dashboard) e clique em **Add New > Project**.
2. Escolha o repositório deste projeto importado do seu GitHub/ZIP.
3. A Vercel detectará automaticamente o **Vite** como o Framework Preset.

### 2. Configurar Variáveis de Ambiente (CRÍTICO)
Antes de clicar em **Deploy**, certifique-se de configurar as seguintes variáveis na aba **Environment Variables** (dentro das configurações do seu projeto Vercel):

| Variável | Valor Recomendado | Descrição | Obrigatória |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | `sua-chave-api-gemini` | Chave de acesso oficial do Google AI Studio para que o chat executivo e geradores de roteiro de campo funcionem de forma proxy backend sem expor suas credenciais no navegador. | **Sim** |
| `NODE_ENV` | `production` | Indica o ambiente de execução produtivo. Automaticamente definido pela Vercel. | Não |

> **Onde obter a GEMINI_API_KEY?**  
> Você pode gerar uma de graça diretamente no [Google AI Studio](https://aistudio.google.com/) clicando em **Get API key**.

### 3. Build & Development Settings (Padrão)
A Vercel aplica as configurações corretas automaticamente. Se houver necessidade de conferência, elas devem ser:
* **Framework Preset:** `Vite`
* **Build Command:** `npm run build` ou `tsc && vite build`
* **Output Directory:** `dist`
* **Install Command:** `npm install`

Clique em **Deploy** e aguarde de 1 a 2 minutos até que seu endereço de produção seja gerado! 🌐

---

## 📂 Arquitetura Técnica & Rotas Serverless

Para rodar o backend de IA sem expor segredos no front e manter a compatibilidade com a Vercel, o projeto foi projetado com uma divisão limpa:

### 🖥️ Frontend (Vite)
* Localizado em `/src/` e compilado para a pasta `/dist`.
* Utiliza componentes modulares, **Lucide React** para iconografia técnica e **Tailwind CSS** para layout de alto contraste e performance.
* Conta com uma **Splash Screen interativa de 5 segundos** com carregamento manual opcional para dar a sensação exata de materialização de infraestrutura de IoT em ambiente militar/corporativo.

### ⚙️ Backend (Vercel Serverless Functions)
* Localizado em `/api/index.ts`.
* Utiliza Express para organizar as rotas de chamada da IA Gemini.
* **`vercel.json`** na raiz gerencia as conexões de reescrita de rotas, onde qualquer tráfego para `/api/*` é roteado para a função serverless `/api/index.ts`, enquanto as demais rotas são devolvidas para o roteador SPA `/index.html`.

#### Rotas Backend Úteis do Sistema:
1. **`POST /api/gemini/chat`**: Processa a conversa entre o co-fundador e conselheiro com Ricardo e a @mnésia_Lab's.
2. **`POST /api/gemini/generate`**: Utilizada para fabricação automatizada de roteiros B2B e relatórios técnicos.

---

## 🛠️ Desenvolvimento Local

Se você quiser testar o projeto rodando localmente na sua máquina idêntico à Vercel:

1. **Instale a CLI da Vercel:**
   ```bash
   npm i -g vercel
   ```
2. **Execute em modo de simulação serverless Vercel local:**
   ```bash
   vercel dev
   ```
   *Isso levantará o servidor de desenvolvimento e as rotas `/api` emulando as funções em cloud da Vercel simultaneamente.*
