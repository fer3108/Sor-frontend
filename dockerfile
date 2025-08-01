# Etapa 1: build de la app
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install
ARG API_URL
ENV VITE_API_URL_V1=${API_URL}
COPY . .
RUN npm run build

# Etapa 2: Nginx para servir archivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]