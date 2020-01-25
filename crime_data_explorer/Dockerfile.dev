FROM node
# Create app directory
WORKDIR /app
# Install app dependencies
COPY /package.json ./
RUN npm install nodemon
RUN npm install 
# Copy app source code
COPY . .    

#Expose port and start applicationa
CMD ["npm","run", "dev"]