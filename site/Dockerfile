FROM node:latest
ENV IN_DOCKER="1"
WORKDIR /usr/bin/site

COPY ./site/package.json .

COPY ./site/package-lock.json .

RUN npm i

ENTRYPOINT ["npm", "run", "start"]