FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY apps/web ./apps/web

# Build web app
WORKDIR /app
RUN yarn workspace web build

# Serve with a simple static server
FROM nginx:alpine
COPY --from=0 /app/apps/web/dist /usr/share/nginx/html

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"] 