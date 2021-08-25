FROM node:latest
ENV IN_DOCKER="1"
WORKDIR /usr/bin/api

COPY ./api/package.json .

COPY ./api/package-lock.json .

RUN npm i

ENTRYPOINT ["npm", "run", "dev"]