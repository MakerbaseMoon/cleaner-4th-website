FROM node:18.14.2-alpine

RUN npm install -g create-react-app

USER node

WORKDIR /home/node/
RUN npx create-react-app cleaner-4th-website

WORKDIR /home/node/cleaner-4th-website
RUN npm install react-bootstrap react-bootstrap-icons bootstrap-icons bootstrap chart.js react-chartjs-2 react-markdown --save

RUN rm -rf /home/node/cleaner-4th-website/src/*
RUN rm -rf /home/node/cleaner-4th-website/public/*
