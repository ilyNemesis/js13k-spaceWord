FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .


FROM nginx:alpine

COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/script.js /usr/share/nginx/html/
COPY --from=builder /app/style.css /usr/share/nginx/html/

EXPOSE 80