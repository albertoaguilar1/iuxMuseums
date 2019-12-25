FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
RUN npm i -s nodemon
COPY . /usr/src/app
ENV MONGO_SERVICE_HOST=mongo
ENV MONGO_SERVICE_PORT=27017
ENV PORT=8081
EXPOSE 8081
CMD [ "npm", "start" ]