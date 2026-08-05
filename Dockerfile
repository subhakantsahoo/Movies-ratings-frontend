FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npx expo export:web

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/web-build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
