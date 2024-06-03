FROM node:lts

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV MONGODB_URL="mongodb+srv://arifaevaixa:DRyokDZQO95JtnPp@devscaleid.diepraq.mongodb.net/bookstore?retryWrites=true&w=majority&appName=DevscaleID"

EXPOSE 3000

CMD ["npm", "start"]