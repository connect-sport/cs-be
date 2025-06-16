FROM node:18

WORKDIR /service/chat-service

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "run", "dev"]