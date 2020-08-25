# Build staging

FROM node:10.16.0-alpine as staging
LABEL component="token-portal-staging"

USER root

# @todo: To use safer user when there's time to configure
RUN npm config set unsafe-perm true

RUN npm install -g grunt-cli

# Copy Git repository to container

COPY ./package.json /opt/app/package.json
COPY ./package-lock.json /opt/app/package-lock.json
COPY ./lerna.json /opt/app/lerna.json
COPY Gruntfile.js /opt/app/Gruntfile.js

COPY packages /opt/app/packages

# Build staging app

WORKDIR /opt/app

RUN npm ci
RUN npm run packages:install

RUN npm -C packages/app run build

ARG BUILD_DATE
LABEL builddate=${BUILD_DATE}
RUN grunt test

# No more prune because it conflicts with Lerna hoisting
# If removing dev dependencies is a must, think of another way to do it (e.g. raise an issue to Lerna)
# RUN npm prune --production

ARG COMMIT
LABEL commit=${COMMIT}

# Build final

FROM node:10.16.0-alpine as final

RUN apk del libc-utils
RUN apk del busybox
RUN apk info
RUN apk del apk-tools

LABEL component="wallet-portal-final"

USER root

COPY --from=staging /opt/app /opt/app
# Copy the hoisted node_modules/ folder, for the packages/app server's dependencies
# COPY --from=staging /opt/app/node_modules /opt/app/node_modules

WORKDIR /opt/app
CMD ["npm", "run", "-C", "packages/app", "prod"]

ARG BUILD_DATE
LABEL builddate=${BUILD_DATE}
ARG COMMIT
LABEL commit=${COMMIT}
