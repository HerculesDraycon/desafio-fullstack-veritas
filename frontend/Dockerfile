# Node.js image based on Alpine
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use of official Nginx image
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx custom configuration for stable React Router
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start of Nginx
CMD ["nginx", "-g", "daemon off;"]