FROM node:18.20.4-alpine as dev
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --force
EXPOSE 3000
CMD ["pnpm", "run", "dev"]
