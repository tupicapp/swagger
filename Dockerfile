# syntax=docker/dockerfile:1.7

# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json .npmrc ./
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN="$(cat /run/secrets/github_token)" \
    && test -n "$GITHUB_TOKEN" || (echo "Missing github_token build secret for private package install" && exit 1) \
    && printf "@tupicapp:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=%s\n" "$GITHUB_TOKEN" > /root/.npmrc \
    && npm ci \
    && rm -f /root/.npmrc

# Copy the rest of the application code to the working directory
COPY . .

# Build the project. Definition URLs are NOT baked in here; they are resolved at
# container start from the environment by docker/nginx/40-write-config.sh.
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:1.27-alpine AS production

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/40-write-config.sh /docker-entrypoint.d/40-write-config.sh

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.d/40-write-config.sh

# Overridden per environment via platform-manifests' charts/swagger/values*.yaml -> ConfigMap -> envFrom.
ENV IAM_DOCS_URL="" \
    ACCOUNTS_DOCS_URL="" \
    LIVE_V2_DOCS_URL="" \
    LIVE_V3_DOCS_URL="" \
    MOMENT_DOCS_URL="" \
    ASSETS_DOCS_URL="" \
    FINANCE_DOCS_URL="" \
    INSIGHTS_DOCS_URL="" \
    NOTIFICATIONS_DOCS_URL="" \
    CHAIN_DOCS_URL="" \
    GAMES_DOCS_URL="" \
    ACADEMY_DOCS_URL="" \
    DEVELOPERS_DOCS_URL="" \
    PRIMARY_DOCS_NAME=""

# Expose the port NGINX will serve on
EXPOSE 80
