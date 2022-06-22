FROM node:alpine3.11 as build

LABEL maintainer="sanja.drinic@uns.ac.rs"
ARG API_URL="https://localhost:8080/"

WORKDIR /usr/src/server
COPY . .
RUN npm install && \
    sed -i -e "/backend_api:/c\\${API_URL}" \
      ./src/environments/environment.ts && \
    npm run build --prod  && \
    cd dist && \
    mv $(ls -d */|head -n 1) /app


FROM nginx:1.21-alpine as execute
EXPOSE 4200
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app /usr/share/nginx/html/app