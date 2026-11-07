FROM node:24.13.1-alpine

LABEL authors="Ilia Kupitman"

WORKDIR /app

COPY package*.json ./

COPY ./src ./src

RUN npm ci --omit=dev

EXPOSE 8080

CMD ["npm","start"]