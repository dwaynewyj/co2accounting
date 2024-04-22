FROM node:lts-gallium

ENV CI=true


WORKDIR ./fe
COPY ./fe/package.json ./fe
#COPY ./fe/package-lock.json ./fe

COPY ./fe ./
COPY ./fe/.env ./.env
RUN npm install --force
#RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN chown -R node:node /fe/node_modules

EXPOSE 3000

CMD ["cd", "./fe"]
CMD ["npm", "start"]
