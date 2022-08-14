# Base
FROM node:16.16-alpine as base
WORKDIR /app

# Dependencies
FROM base as dependencies
COPY package*.json ./
RUN npm install \
    && npm cache clean --force
COPY . .

# Build
FROM base as build
COPY --from=dependencies /app ./
RUN npm run build \
    && npm prune --production

# Application
FROM base as application
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main.js"]
