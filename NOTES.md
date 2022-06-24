# ANOTAÇÕES

## Criando um projeto com Meteor
> OBS: Necessário ter instalado o meteor na sua maquina para que a CLI do meteor funcione
> Veja: https://www.meteor.com/developers/install
```bash
# Comando para criar um projeto com meteor
$ meteor create NOME_DO_PROJETO

# Instalar as dependencias, acesse o seu projeto e no terminal execute
$ meteor

# Acessar o client do projeto
localhost:3000

# Acessar o banco de dados do mongo
localhost:3001
```

## Instalando TailwindCSS
> Caso houver duvidas veja o tutorial no blog https://blog.meteor.com/meteor-js-with-react-and-tailwind-css-3-3e878645451e

```bash
# Para instalar a versão 3 do TailwindCSS
$ meteor npm install tailwindcss postcss autoprefixer postcss-load-config

# Para iniciar o TailwindCSS no projeto
$ npx tailwindcss init -p

# Após ser executado o comando acima, na raiz do projeto vai criar os arquivos:
- postcss.config.js
- tailwind.config.js

# Remover standard-minifier-css
$ meteor remove standard-minifier-css

# instalar juliancwirko:postcss
$ meteor add juliancwirko:postcss    
```

**Configure seu arquivo `tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Adicione diretivas Tailwind ao seu arquivo `client/main.css`.**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

pronto, agora voce pode começar a utilizar o tailwindcss adicionando nas classes dos seus elementos JSX/TSX.