# Этап 1: Сборка
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап 2: Раздача статики через Nginx
FROM nginx:stable-alpine
# Копируем билд из первого этапа в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Копируем конфиг (создадим его ниже)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]