FROM node:lts-alpine

# Create app directory
WORKDIR /car_prices_service/price_service

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8000
CMD ["npm","start"]