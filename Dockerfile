FROM node:16
#Setting up working directory to keep our code and execute code 
WORKDIR /app
#copying the package.json file onto this docker image in current location
COPY package.json ./
#installing the dependencies for this application to execute
RUN npm install
COPY . /app
EXPOSE 3000
CMD npm start
#CMD ["nodemon","server.js"]
# CMD ["npm","start"]