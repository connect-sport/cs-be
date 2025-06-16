FROM node:18

WORKDIR /main-service

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5004

ENV NODE_ENV=docker

CMD ["npm", "run", "dev"]