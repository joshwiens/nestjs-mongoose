# This is a private Google Container Registry, replace with node:latest for public use.
FROM gcr.io/jobtrak-155518/docker-node8-lts:latest
MAINTAINER EasyMetrics <joshuaw@easymetrics.com>

ENV APP_ENV production

# Set environment variables
RUN mkdir -p /var/www/app/current/nest-server
ENV appDir /var/www/app/current

COPY package.json /var/www/app/current

WORKDIR ${appDir}
RUN npm i --production

# Copy production build files
# ...
COPY ./dist /var/www/app/current/nest-server

# PM2 Configuration
# ...
COPY ./process.yml /var/www/app/current

# DotEnv Configuration
# ...
COPY ./.env.example /var/www/app/current/.env

#ENV KEYMETRICS_SECRET <configureSecretKey>
#ENV KEYMETRICS_PUBLIC <configurePublicKey>
#ENV INSTANCE_NAME "<configure instance name>"

#Expose the ports ( Nest http2/s, socket.io, keymetrics )
EXPOSE 4433 3001 43554

CMD ["pm2-docker", "start", "--auto-exit", "--env", "production", "process.yml"]
