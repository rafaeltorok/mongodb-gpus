FROM node:20-alpine

WORKDIR /usr/src/alternate_client

# Install curl for the healthcheck
RUN apk add --no-cache curl

COPY package*.json ./

RUN npm install

EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host", "--port", "5174"]
