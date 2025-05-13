FROM node:18

WORKDIR /auth-service

COPY package*.json ./
RUN npm install

COPY .env ./
COPY . .

EXPOSE 5001

ENV NODE_ENV=docker

CMD ["npm", "run", "dev"]