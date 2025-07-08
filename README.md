# 🐾 RUFF-AI

> Um bot inteligente que revisa Pull Requests com sugestões de melhorias, lint e identificação de _code smells_ usando LLMs e Probot.

---

## ✨ Visão Geral

O **RUFF-AI** é um GitHub App construído com [Probot](https://probot.github.io/) que analisa PRs automaticamente. Ele detecta problemas de estilo, _code smells_ e boas práticas usando um agente baseado em [LangChain](https://www.langchain.com/), sugerindo melhorias diretamente nos comentários dos PRs.

---

## 📦 Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Probot](https://probot.github.io/)
- [LangChain](https://www.langchain.com/)

---

## 📁 Estrutura do Projeto

```bash
src/
├── agents/              # Agentes LLM via LangChain
├── github/              # Helpers para eventos do GitHub via Probot\
├── config/              # Env/etc
└── index.ts             # Entry point (handler do Probot)
```

## 🚀 Como Rodar Localmente

**1. Instale as dependências**
```
npm install
```

**2. Configure o .env**
Crie um .env com base no .env.example:
```
cp .env.example .env
```
Exemplo:
```
APP_ID=123456
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCA...\n-----END RSA PRIVATE KEY-----"
WEBHOOK_SECRET=mywebhooksecret
OPENAI_API_KEY=sk-...
```
| Você pode obter esses dados ao registrar o app em https://github.com/settings/apps

**3. Inicie o listener de Webhook com Smee**
	•	Vá até https://smee.io e clique em “Start a new channel”
	•	Copie a URL do canal (ex: https://smee.io/abc123)
	•	Cole no terminal para iniciar o proxy:
```
npx smee -u https://smee.io/abc123 --port 3000
````
  • Configure essa URL no campo Webhook URL do seu GitHub App.
  • Configure essa URL no .env

**4. Rode o bot localmente**
```
npm run start
```
