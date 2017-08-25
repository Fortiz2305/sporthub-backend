FROM node:6-slim

RUN apt-get update \
  && apt-get install -y build-essential python

COPY ${PWD}/ /code/sporthub/
RUN cd /code/sporthub && npm install

VOLUME /code/sporthub/node_modules

EXPOSE 3000
WORKDIR /code/sporthub
CMD ["node", "index.js"]
