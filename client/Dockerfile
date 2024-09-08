FROM node:20.5.0

WORKDIR /app

COPY . /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
