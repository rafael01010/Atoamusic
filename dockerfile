FROM node:16.15.0-alpine
WORKDIR /test-app
COPY package.json package-lock.json ./
RUN npm install -g npm@8.11.0
RUN npm i
COPY . ./
EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]