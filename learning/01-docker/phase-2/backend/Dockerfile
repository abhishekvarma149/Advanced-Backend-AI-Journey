FROM node
WORKDIR /app

#copy the files starting with package and ending with .json
COPY package*.json ./ 

RUN npm install

#copy all the files
COPY . .

CMD ["node","index.js"]