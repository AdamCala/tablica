FROM node:latest

WORKDIR /backend

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npx prisma generate

CMD [ "npm", "run", "start" ]