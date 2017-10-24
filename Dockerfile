FROM d3vaint0ne/docker-node8-lts:latest
MAINTAINER d3viant0ne <wiens.joshua@gmail.com>

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
EXPOSE 4433 43554 80

CMD ["pm2-docker", "start", "--auto-exit", "--env", "production", "process.yml"]
