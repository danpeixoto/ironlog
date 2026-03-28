# IronLog

App web para registrar treinos, acompanhar progresso e sugerir cargas com base na sua configuração. **Sem backend**: tudo fica no `localStorage` do navegador.

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com/) + lucide-react
- Deploy recomendado: [Vercel](https://vercel.com)

## Instalação

```bash
npm install
```

## Desenvolvimento local

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm start
```

## Deploy na Vercel

1. Envie o projeto para um repositório Git (GitHub, GitLab ou Bitbucket).
2. Na Vercel: **Add New Project** → importe o repositório.
3. Framework: **Next.js** (detectado automaticamente).
4. Não são necessárias variáveis de ambiente para o MVP.
5. Deploy.

Os dados continuam **apenas no navegador** de cada usuário; nada é persistido no servidor.

## Scripts

| Comando       | Descrição        |
| ------------- | ---------------- |
| `npm run dev` | Servidor de dev  |
| `npm run build` | Build produção |
| `npm run start` | Servir build   |
| `npm run lint`  | ESLint         |
