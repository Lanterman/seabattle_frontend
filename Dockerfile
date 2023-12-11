FROM node:19.5.0-alpine

WORKDIR /app/frontend

ADD *.json ./

RUN npm install

RUN npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

ADD ./public ./public
ADD ./src ./src
