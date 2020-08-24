FROM node:{v}-alpine

WORKDIR /app

COPY ./app.js ./app.js
COPY ./package.json ./package.json
RUN npm install --production

EXPOSE 4000

CMD ["npm", "start"]

# docker build -t demo .
# docker run -ti --rm -p 4000:4000 demo
# curl -L http://localhost:4000
