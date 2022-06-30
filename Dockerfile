# Use Node v4 as the base image.
FROM node:14.4-alpine3.11

WORKDIR /backEnd

# Add everything in the current directory to our image, in the 'app' folder.
COPY  package.json  ./ 
COPY tsconfig.json ./

# Install dependencies
RUN npm install 

# 
COPY . .

EXPOSE 5000

# Run our app.
CMD ["npm", "run","start"]
