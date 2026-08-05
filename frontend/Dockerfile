# Node.js image based on Alpine
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Use of official Nginx image
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Nginx custom configuration for stable React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start of Nginx
CMD ["nginx", "-g", "daemon off;"]