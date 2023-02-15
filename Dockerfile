FROM node:16
#Setting up working directory to keep our code and execute code 
WORKDIR /app
#installing the dependencies for this application to execute
COPY . /app
RUN npm install
EXPOSE 3000
CMD npm start
