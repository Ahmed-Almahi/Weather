FROM node:22.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx next build --turbopack

EXPOSE 3000

CMD [ "npm", "start" ]