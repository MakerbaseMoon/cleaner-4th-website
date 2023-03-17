FROM node:18.14.2

RUN apt update
RUN apt install -y sudo
RUN apt install -y python3

RUN echo "node ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers.d/node

RUN npm install -g create-react-app

USER node