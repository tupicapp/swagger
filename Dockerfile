# Stage 1: Build the application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the project
RUN yarn build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port NGINX will serve on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]