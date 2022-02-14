ARG WORK_DIR=/build

FROM node:14.17.6 as builder

ARG WORK_DIR
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install @angular/cli@12.2.7
RUN npm install

COPY . ${WORK_DIR}

RUN ng build --configuration=production

FROM nginx:latest

ARG WORK_DIR

COPY --from=builder ${WORK_DIR}/dist/frontend-web-server-tmf639 /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD nginx -g "daemon off;"