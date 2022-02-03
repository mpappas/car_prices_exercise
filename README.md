<h1 align="center">
🔥 Car Prices Service 🚀
</h1>

NodeJS service that exposes a REST interface where the client can request car prices.

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [redis](https://www.npmjs.com/package/redis) - node-redis is a modern, high performance Redis client for Node.js with built-in support for Redis
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [jest](https://www.npmjs.com/package/jest) - JavaScript Testing Framework

## Application Structure

- price_service
  - `app.js` - The entry point to our application. This file defines our express server. It also requires the routes we'll be using in the application and cacheManager with Redis configs and methods.
  - `config/` - This folder contains configuration like MongoDB URI (for future use) and Redis URL.
  - `routes/` - This folder contains the route definitions for our API.
  - `prices/` - This folder contains priceController file where we define our main methods.
  - `helpers/` - This folder contains externalApis file where we define `getExternalPrice` method adn functionality.
- external_service - Simple express server that handles GET requests and facilitates our extranal API calls.

## 🛠 Installation & Set Up

1. Install dependencies for both services

   ```sh
   cd price_service
   npm install
   cd ../external_service
   npm install
   ```

2. Start both service. You should change directory to each of the service in different bash sessions.
   ```sh
   npm run server
   ```
3. Setup project using Docker
   ```sh
   docker-compose up
   ```
