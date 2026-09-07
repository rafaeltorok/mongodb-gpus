FROM node:20-alpine

WORKDIR /usr/src/server

# Install curl for the healthcheck
RUN apk add --no-cache curl

COPY --chown=node:node ./package*.json .

RUN npm install

ENV DEBUG=server:*

EXPOSE 4000

USER node

CMD ["npm", "run", "dev"]
