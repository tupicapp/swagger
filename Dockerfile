# Stage 1: Build the application
FROM node:20 AS build

# Define build arguments
ARG CORE_URL
ARG OAUTH_URL
ARG BLOG_URL

# Set environment variables based on build arguments
ENV VITE_CORE_URL=$CORE_URL
ENV VITE_OAUTH_URL=$OAUTH_URL
ENV VITE_BLOG_URL=$BLOG_URL

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json package-lock.json .npmrc ./
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN="$(cat /run/secrets/github_token)" \
    && test -n "$GITHUB_TOKEN" || (echo "Missing github_token build secret for private package install" && exit 1) \
    && printf "@tupicapp:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=%s\n" "$GITHUB_TOKEN" > /root/.npmrc \
    && npm ci \
    && rm -f /root/.npmrc

# Copy the rest of the application code to the working directory
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port NGINX will serve on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]