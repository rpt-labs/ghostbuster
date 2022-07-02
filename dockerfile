FROM node:14

RUN npm install --global nodemon

# Create app directory
WORKDIR /server

# Install app dependencies
COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 1234

CMD ["npm", "run", "dev"]