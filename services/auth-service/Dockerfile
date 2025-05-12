FROM node:18

WORKDIR /auth-service

COPY package*.json ./
RUN npm install

COPY .env ./
COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]