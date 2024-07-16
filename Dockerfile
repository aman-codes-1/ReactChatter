# Use the official Node.js image
FROM node:20-alpine as build

# Create app directory and copy files
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set environment variables
ARG PORT
ARG NODE_ENV
ARG REACT_APP_PROXY_URI
ARG REACT_APP_SERVER_URI
ARG REACT_APP_PROXY_DOMAIN
ARG REACT_APP_GOOGLE_CLIENT_ID

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}
ENV REACT_APP_PROXY_URI=${REACT_APP_PROXY_URI}
ENV REACT_APP_SERVER_URI=${REACT_APP_SERVER_URI}
ENV REACT_APP_PROXY_DOMAIN=${REACT_APP_PROXY_DOMAIN}
ENV REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}

# Build the app
RUN npm run build

# Use nginx as a lightweight HTTP server to serve the frontend build
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the entry point script into the container
COPY nginxPop.sh /nginxPop.sh

# Make entry point script executable
RUN chmod +x /nginxPop.sh


# Expose $PORT
EXPOSE ${PORT}

# Set the entry point and default command
ENTRYPOINT ["/nginxPop.sh"]

# Run Nginx with daemon off
CMD ["nginx", "-g", "daemon off;"]