# Project Title

Online Shopping Application

This project developed using Reactjs . In this application the user can register and login to the application and view the products and the user can add the items to the cart and order the products

## Authors

- [@Salma Khanum](https://github.com/salmakhanum401)

## Installation

* Download and Install Nodejs from the Nodejs website
* And run the below command in project root directory


```bash
  npm install
```

Then to run the project run the below command

```bash
  npm start
```
## Docker Installation 
* Download and install Docker Desktop 
* Create a file with the name Dockerfile and paste below code in it
``` 
FROM node:16
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
CMD npm start
```
### Build Docker image using below command
```
docker build -t <your_tag_name> .
```

 ### Run the Docker image inside the container using below command
 ```
 docker run -d -p 9590:3000 <your_tag_name>
 ```
### Open the below url to access the application
```
http://localhost:9590
```



    