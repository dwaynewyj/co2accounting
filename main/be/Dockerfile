FROM node:lts-gallium

ENV CI=true


WORKDIR ./be
COPY ./be/package.json ./be
#COPY ./be/package-lock.json ./be

COPY ./be ./
COPY ./be/.env ./.env

#RUN npm ci && npm cache clean --force

RUN npm install --force
RUN rm -rf package-lock.json
RUN npm rebuild bcrypt --build-from-source
RUN npm uninstall bcrypt
RUN npm install bcrypt --save
#RUN npm install --platform=linux --arch=arm64v8 sharp

EXPOSE 8000

CMD ["cd", "./be"]
CMD ["npm", "start"]
