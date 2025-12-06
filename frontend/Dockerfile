# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Copy serve.json to build directory
COPY serve.json ./build/

# 最终阶段
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3001
CMD ["serve", "-s", "build", "-l", "3001", "--no-clipboard"]
