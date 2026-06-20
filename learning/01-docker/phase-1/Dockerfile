# FROM node

# WORKDIR /app #create a directory named app and set it as the working directory

# COPY package.json package.json 
# COPY package-lock.json package-lock.json

# COPY index.js index.js

# RUN npm install #install dependencies

# CMD ["node","index.js"] #run the command node index.js when the container starts

#OPTIMISED DOCKERFILE

FROM node
WORKDIR /app

#copy the files starting with package and ending with .json
COPY package*.json ./ 

RUN npm install

#copy all the files
COPY . .

CMD ["node","index.js"]