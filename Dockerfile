FROM node:14-alpine AS builder
ARG REACT_APP_ASE_ENDPOINT=http://ase-delivery.westeurope.cloudapp.azure.com:8082
ENV SKIP_PREFLIGHT_CHECK=true
ENV REACT_APP_ASE_ENDPOINT=$REACT_APP_ASE_ENDPOINT
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:1.19-alpine AS server
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=builder ./app/build /usr/share/nginx/html
