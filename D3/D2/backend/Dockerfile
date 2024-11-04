#Keanu Ellary u22893459

FROM node:20

WORKDIR /D2

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

CMD [ "npm", "start" ]

EXPOSE 3000