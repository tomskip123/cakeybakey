# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

COPY . ./app

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

RUN npm install


# Development build stage
FROM common-build-stage as development-build-stage

# RUN chmod +x /app/docker-entrypoint.sh

ENV NODE_ENV development

CMD ["npm", "run", "start"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
