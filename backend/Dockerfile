# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

# 最终阶段
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Install runtime dependencies for SQLite
RUN apk add --no-cache python3 make g++

COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Rebuild native modules for the container environment
RUN npm rebuild sqlite3

EXPOSE 3000
CMD ["npm", "start"]
