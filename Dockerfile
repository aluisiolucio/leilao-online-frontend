# Definir o estágio de construção
FROM node:20 as build-stage

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependências e instalar
COPY package*.json ./
RUN npm install

# Copiar o resto dos arquivos da aplicação
COPY . .

# Compilar a aplicação TypeScript para JavaScript
RUN npm run build

# Definir o estágio de produção
FROM nginx:stable-alpine as production-stage

# Copiar o build do estágio de construção para o servidor nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expôr a porta 80 para o servidor nginx
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
