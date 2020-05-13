FROM node:lts
COPY . /app
WORKDIR /app
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]
