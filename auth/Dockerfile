FROM node as builder 

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build




FROM node:slim

ENV NODE_ENV production

WORKDIR /app
COPY package*.json .
RUN npm ci --production
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/index.js"]