FROM node:20-alpine

WORKDIR /usr/src/client

# Install curl for the healthcheck
RUN apk add --no-cache curl

COPY package*.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
